import { IsNotEmpty, IsNumber, IsUUID, IsDateString, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ description: 'The ID of the student making the payment' })
  @IsNotEmpty()
  @IsUUID()
  studentId: string;

  @ApiProperty({ description: 'The ID of the group the payment is for' })
  @IsNotEmpty()
  @IsUUID()
  groupId: string;

  @ApiProperty({ description: 'The ID of the teacher associated with the group' })
  @IsNotEmpty()
  @IsUUID()
  teacherId: string;

  @ApiProperty({ description: 'The date the payment was made', example: '2024-03-08' })
  @IsNotEmpty()
  @IsDateString()
  paymentDate: string;

  @ApiProperty({ description: 'The amount of the payment', example: 100000 })
  @IsNotEmpty()
  @IsNumber() 
  amount: number; 

  @ApiProperty({ description: 'The Stripe payment intent ID' }) 
  @IsString()
  paymentIntentId: string; 

  @ApiProperty({ description: 'The phone number of the student making the payment' })
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phoneNumber: string;
}