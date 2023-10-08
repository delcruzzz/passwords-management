import { Module } from '@nestjs/common';
import { SitesService } from './services/sites.service';
import { SitesController } from './controllers/sites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';

@Module({
  controllers: [SitesController],
  providers: [SitesService],
  imports: [TypeOrmModule.forFeature([Site])],
})
export class SitesModule {}
