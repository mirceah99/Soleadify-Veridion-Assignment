import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import UpdateCreateCompanyDto from './dto/update-create-company.dto';
import SearchCompanyDto from './dto/search-company.dto';
ElasticsearchService;
@Injectable()
export class CompanyRepository {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  getCompanies(query: SearchCompanyDto) {
    const match = { ...query };
    return this.elasticsearchService.search({
      index: 'main',
      body: {
        query: {
          match: match,
        },
      },
    });
  }
  setCompany(company: UpdateCreateCompanyDto) {
    return this.elasticsearchService.index({
      index: 'main',
      body: company,
      id: company.domain,
    });
  }
}
