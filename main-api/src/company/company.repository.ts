import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import UpdateCreateCompanyDto from './dto/update-create-company.dto';
import SearchCompanyDto from './dto/search-company.dto';
import { Company } from './company.model';
ElasticsearchService;
@Injectable()
export class CompanyRepository {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async getCompanies(query: SearchCompanyDto): Promise<Company[]> {
    if (Object.keys(query).length > 1) throw `Can query by just one attribute`;
    const body = {
      query: {
        query_string: {
          fields: [Object.keys(query)[0]],
          query: `*${query[Object.keys(query)[0]]}*`, //TODO I have to improve this
          escape: true,
        },
      },
    };

    const rowResult = await this.elasticsearchService.search<Company>({
      index: 'main',
      body,
    });
    return rowResult.hits.hits.map((searchHit) => searchHit._source);
  }
  async upsertCompany(company: UpdateCreateCompanyDto) {
    await this.elasticsearchService.update({
      index: 'main',
      body: {
        doc: company,
        doc_as_upsert: true,
      },
      id: company.domain,
    });
    return company;
  }
  escapeQuery(query: string) {
    return query.replace(
      /([\!\*\+\-\=\<\>\&\|\(\)\[\]\{\}\^\~\?\:\\/"])/g,
      '\\$1',
    );
  }
}
