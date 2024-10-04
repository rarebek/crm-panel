import { IsString, IsInt, IsEmail, IsOptional, IsPhoneNumber, IsUrl } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsPhoneNumber("UZ")
  phone_number: string;

  @IsString()
  parent_name: string;

  @IsPhoneNumber("UZ")
  parent_phone_number: string;

  @IsString()
  @IsUrl()
  photo: string;
}
