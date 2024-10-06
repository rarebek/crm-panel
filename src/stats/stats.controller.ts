import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('month/:year/:month')
  @ApiOperation({ summary: 'Get statistics for a given month' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully.' })
  @ApiParam({ name: 'year', description: 'The year (e.g., 2024)', example: '2024' })
  @ApiParam({ name: 'month', description: 'The month (1-12)', example: '3' })
  async getMonthlyStats(
    @Param('year') year: string,
    @Param('month') month: string,
  ): Promise<{ 
    totalStudents: number, 
    studentsLeft: number, 
    totalGroups: number, 
    totalTeachers: number 
  }> {
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);

    const [totalStudents, studentsLeft, totalGroups, totalTeachers] = await Promise.all([
      this.statsService.getTotalStudents(yearNum, monthNum),
      this.statsService.getStudentsLeftCount(yearNum, monthNum),
      this.statsService.getTotalGroups(yearNum, monthNum),
      this.statsService.getTotalTeachers(yearNum, monthNum),
    ]);

    return { totalStudents, studentsLeft, totalGroups, totalTeachers }; 
  }
}