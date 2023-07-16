import { Body, Controller, Get, Post } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import SaveStatisticsDto from './save-statistics-dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @Get()
  getStatistics() {
    return this.statisticsService.getStatistics();
  }
  @Post()
  saveStatistics(@Body() body: SaveStatisticsDto) {
    return this.statisticsService.saveStatistics(body.rawHtml);
  }
}
