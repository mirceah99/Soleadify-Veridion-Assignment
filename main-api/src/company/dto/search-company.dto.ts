import { IsString, Length, IsOptional } from 'class-validator';
export default class SearchCompanyDto {
  @IsString()
  @Length(4, 255)
  @IsOptional()
  domain?: string;

  @IsString()
  @Length(4, 500)
  @IsOptional()
  phoneNumber?: string;
}
