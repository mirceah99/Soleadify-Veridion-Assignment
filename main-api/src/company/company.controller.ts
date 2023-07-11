import { Controller, Get, Post } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getCompanies() {
    return this.companyService.getCompany();
  }
  @Post()
  setCompany() {
    return this.companyService.setCompany();
  }
}
