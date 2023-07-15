import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { CompanyRepository } from './company.repository';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // for elastic https bullshit
console.dir({
  username: process.env.ELASTIC_USERNAME || 'elastic',
  password: process.env.ELASTIC_PASSWORD,
});
@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTIC_URL || 'https://127.0.0.1:9200/',
      auth: {
        username: process.env.ELASTIC_USERNAME || 'elastic',
        password: process.env.ELASTIC_PASSWORD,
      },
    }),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
