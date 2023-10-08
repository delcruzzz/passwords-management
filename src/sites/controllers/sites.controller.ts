import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SitesService } from '../services/sites.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesDecorator } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/roles/enums/roles.enum';

@Controller('sites')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get()
  @RolesDecorator(Roles.SuperAdmin, Roles.User)
  findAll() {
    return this.sitesService.findAll();
  }

  @Get(':id')
  @RolesDecorator(Roles.SuperAdmin, Roles.User)
  findOne(@Param('id') id: string) {
    return this.sitesService.findOne(+id);
  }
}
