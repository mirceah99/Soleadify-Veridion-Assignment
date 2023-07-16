import { IsString } from 'class-validator';
export default class SaveStatisticsDto {
  @IsString()
  rawHtml: string;
}
