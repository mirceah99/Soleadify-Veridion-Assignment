import { IsString, Length, IsArray } from 'class-validator';
export default class UpdateCreateCompanyDto {
  @IsString()
  @Length(4, 255)
  domain: string;

  @IsArray()
  @IsString({ each: true })
  @Length(4, 500, { each: true })
  addresses: string[];

  @IsArray()
  @IsString({ each: true })
  @Length(4, 500, { each: true })
  phoneNumbers: string[];

  @IsArray()
  @IsString({ each: true })
  @Length(4, 500, { each: true })
  socialMediaLinks: string[];
}
