import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  setCompany() {
    return this.companyRepository.setCompany();
  }
  getCompany() {
    return this.companyRepository.getCompany();
  }
}
