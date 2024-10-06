import { IsNotEmpty, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({ description: 'The ID of the group this lesson is for' })
  @IsNotEmpty()
  @IsUUID()
  groupId: string;

  @ApiProperty({ description: 'The start time of the lesson', example: '2024-03-10T10:00:00Z' })
  @IsNotEmpty()
  @IsDateString()
  startTime: string; 
}