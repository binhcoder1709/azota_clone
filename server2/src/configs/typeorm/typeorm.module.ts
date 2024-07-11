import { Module } from '@nestjs/common';
import { ormProviders } from './typeorm.service';

@Module({
  providers: [...ormProviders],
  exports: [...ormProviders],
})

export class OrmModule {}
