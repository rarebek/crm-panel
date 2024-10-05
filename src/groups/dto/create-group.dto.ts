import { IsNotEmpty, IsUUID, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ 
    example: '550e8400-e29b-41d4-a716-446655440000', 
    description: 'UUID of the group', 
    type: 'string', 
    format: 'uuid' 
  })
  @IsUUID() 
  id: string; 

  @ApiProperty({ 
    example: 'Math Group', 
    description: 'Name of the group', 
    maxLength: 255 
  })
  @IsString() 
  @IsNotEmpty()
  @MaxLength(255) 
  name: string;

  @ApiProperty({ 
    example: '650e8400-e29b-41d4-a716-446655440001', 
    description: 'UUID of the teacher assigned to this group', 
    type: 'string', 
    format: 'uuid', 
    required: false 
  })
  @IsUUID() 
  @IsOptional() 
  teacherId?: string;
}
