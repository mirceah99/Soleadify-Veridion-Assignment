import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [CompanyModule, StatisticsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
