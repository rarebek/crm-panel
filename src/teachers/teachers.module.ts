import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Teacher } from "./entities/teacher.entity";
import { Payment } from 'src/payment/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Payment])],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
