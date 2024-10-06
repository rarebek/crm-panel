import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterStudentsDto {
  @ApiProperty({
    description: 'The name of the student to filter by',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The phone number of the student to filter by',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({
    description: 'The name of the parent to filter by',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  parent_name?: string;

  @ApiProperty({
    description: 'The phone number of the parent to filter by',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  parent_phone_number?: string;
}
