import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
  statistics: string;
  constructor() {
    this.statistics = `<p>Crawl job not ended, please wait..</p>`;
  }

  getStatistics() {
    return this.statistics;
  }
  saveStatistics(statistics: string) {
    this.statistics = statistics;
  }
}
