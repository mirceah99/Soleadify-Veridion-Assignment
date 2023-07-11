import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
ElasticsearchService;
@Injectable()
export class CompanyRepository {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  getCompany() {
    return this.elasticsearchService.search({
      index: 'main',
      body: {
        query: {
          match: { car: 'logan2' },
        },
      },
    });
  }
  setCompany() {
    return this.elasticsearchService.index({
      index: 'main',
      body: { car: 'logan2' },
    });
  }
}
