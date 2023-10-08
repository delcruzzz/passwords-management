import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from '../entities/site.entity';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
  ) {}

  async findAll() {
    return await this.siteRepository.find({
      select: ['id', 'name', 'imageUrl'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number) {
    const site = await this.siteRepository.findOne({
      where: { id },
      select: ['id', 'name', 'imageUrl'],
    });

    if (!site)
      throw new HttpException(
        { message: 'Site not found' },
        HttpStatus.NOT_FOUND,
      );

    return site;
  }
}
