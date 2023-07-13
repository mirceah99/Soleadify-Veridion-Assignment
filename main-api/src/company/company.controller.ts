import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import UpdateCreateCompanyDto from './dto/update-create-company.dto';
import SearchCompanyDto from './dto/search-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getCompanies(@Query() query: SearchCompanyDto) {
    return this.companyService.getCompanies(query);
  }
  @Post()
  setCompany(@Body() body: UpdateCreateCompanyDto) {
    return this.companyService.setCompany(body);
  }
}
