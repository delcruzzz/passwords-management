import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePasswordDto } from '../dto/create-password.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from '../entities/password.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SitesService } from 'src/sites/services/sites.service';
import { UsersService } from 'src/users/services/users.service';
import { duplicateErrorKey } from 'src/common/constants';

@Injectable()
export class PasswordsService {
  constructor(
    @InjectRepository(Password)
    private readonly passwordRepository: Repository<Password>,
    private readonly sitesService: SitesService,
    private readonly usersService: UsersService,
  ) {}

  async create(createPasswordDto: CreatePasswordDto) {
    const password = this.passwordRepository.create(createPasswordDto);
    const passwordEncripted = await bcrypt.hash(password.password, 10);
    password.password = passwordEncripted;

    try {
      if (createPasswordDto.siteId) {
        const site = await this.sitesService.findOne(createPasswordDto.siteId);
        password.site = site;
      }
      if (createPasswordDto.userId) {
        const user = await this.usersService.findOne(createPasswordDto.userId);
        password.user = user;
      }

      await this.passwordRepository.save(password);
      return {
        id: password.id,
        password: password.password,
        site: password.site,
        user: password.user,
      };
    } catch (error: any) {
      if (error.code === duplicateErrorKey)
        throw new HttpException(
          { message: 'duplicateErrorKey' },
          HttpStatus.BAD_REQUEST,
        );

      throw new HttpException(
        { message: 'internalServerError' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(userId: number) {
    return await this.passwordRepository
      .createQueryBuilder('passwords')
      .leftJoinAndSelect('passwords.site', 'site')
      .leftJoinAndSelect('passwords.user', 'user')
      .select([
        'passwords.id',
        'passwords.password',
        'site.id',
        'site.name',
        'user.id',
      ])
      .where('user.id = :userId', { userId })
      .getMany();
  }

  findOne(id: number) {
    const password = this.passwordRepository
      .createQueryBuilder('password')
      .leftJoinAndSelect('password.site', 'site')
      .leftJoinAndSelect('password.user', 'user')
      .select([
        'password.id',
        'password.password',
        'site.id',
        'site.name',
        'user.id',
      ])
      .where('password.id = :id', { id })
      .getOne();

    if (!password)
      throw new HttpException(
        { message: 'passwordNotFound' },
        HttpStatus.NOT_FOUND,
      );
    return password;
  }

  update(id: number, updatePasswordDto: UpdatePasswordDto) {
    return `This action updates a #${id} password`;
  }

  remove(id: number) {
    return `This action removes a #${id} password`;
  }
}
