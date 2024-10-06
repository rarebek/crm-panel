import { IsNotEmpty, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAttendanceDto {
  @ApiProperty({ description: 'The ID of the student' })
  @IsNotEmpty()
  @IsUUID()
  studentId: string;

  @ApiProperty({ description: 'Whether the student is present (true) or absent (false)' })
  @IsNotEmpty()
  @IsBoolean()
  isPresent: boolean;
}