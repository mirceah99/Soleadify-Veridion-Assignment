import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import UpdateCreateCompanyDto from './dto/update-create-company.dto';
import SearchCompanyDto from './dto/search-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getCompanies(@Query() query: SearchCompanyDto) {
    if (Object.keys(query).length > 1)
      throw new BadRequestException(
        `Can query by only one attribute as a time`,
      );
    return this.companyService.getCompanies(query);
  }
  @Post()
  setCompany(@Body() body: UpdateCreateCompanyDto) {
    return this.companyService.upsertCompany(body);
  }
}
