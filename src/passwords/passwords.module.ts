import { Module } from '@nestjs/common';
import { PasswordsService } from './services/passwords.service';
import { PasswordsController } from './controllers/passwords.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Password } from './entities/password.entity';
import { SitesController } from 'src/sites/controllers/sites.controller';
import { UsersController } from 'src/users/controllers/users.controller';
import { SitesService } from 'src/sites/services/sites.service';
import { UsersService } from 'src/users/services/users.service';
import { Site } from 'src/sites/entities/site.entity';
import { User } from 'src/users/entities/user.entity';
import { RolesController } from 'src/roles/controllers/roles.controller';
import { RolesService } from 'src/roles/services/roles.service';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  controllers: [
    PasswordsController,
    SitesController,
    UsersController,
    RolesController,
  ],
  providers: [PasswordsService, SitesService, UsersService, RolesService],
  imports: [TypeOrmModule.forFeature([Password, Site, User, Role])],
})
export class PasswordsModule {}
