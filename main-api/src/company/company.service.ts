import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import UpdateCreateCompanyDto from './dto/update-create-company.dto';
import SearchCompanyDto from './dto/search-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  upsertCompany(company: UpdateCreateCompanyDto) {
    // check for duplicates phone numbers or etc
    // merge with already existent ones ?? feature or bug
    console.log(`get request to upsert company:`);
    console.dir(company);
    return this.companyRepository.upsertCompany(company);
  }
  async getCompanies(query: SearchCompanyDto) {
    return this.companyRepository.getCompanies(query);
  }
}
