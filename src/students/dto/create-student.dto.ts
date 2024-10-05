import { IsString, IsPhoneNumber, IsUrl, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ 
    example: 'John Doe', 
    description: 'Name of the student' 
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    example: '+998991234567', 
    description: 'Phone number of the student' 
  })
  @IsPhoneNumber("UZ")
  phone_number: string;

  @ApiProperty({ 
    example: 'Jane Doe', 
    description: 'Name of the parent or guardian' 
  })
  @IsString()
  parent_name: string;

  @ApiProperty({ 
    example: '+998911234567', 
    description: 'Phone number of the parent or guardian' 
  })
  @IsPhoneNumber("UZ")
  parent_phone_number: string;

  @ApiProperty({ 
    example: 'https://example.com/photo.jpg', 
    description: 'URL of the student’s photo' 
  })
  @IsString()
  @IsUrl()
  photo: string;

  @ApiProperty({
    example: "group of uuid here"
  })
  @IsUUID()
  group_id: string;
}
