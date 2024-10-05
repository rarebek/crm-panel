import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the teacher',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone number of the teacher',
  })
  @IsPhoneNumber('UZ')
  phone_number: string;
}
