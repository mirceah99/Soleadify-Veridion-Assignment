import { IsString, Length, IsArray, IsOptional } from 'class-validator';
export default class UpdateCreateCompanyDto {
  @IsString()
  @Length(4, 255)
  domain: string;

  @IsArray()
  @IsString({ each: true })
  @Length(4, 500, { each: true })
  @IsOptional()
  addresses?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Length(4, 500, { each: true })
  phoneNumbers?: string[];

  @IsArray()
  @IsString({ each: true })
  @Length(4, 500, { each: true })
  @IsOptional()
  socialMediaLinks?: string[];
}
