import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { CompanyRepository } from './company.repository';
@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      auth: { username: 'admin', password: 'mircea' },
    }),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
