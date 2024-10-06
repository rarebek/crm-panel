import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { GraphInspector } from '@nestjs/core';
import { Group } from 'src/groups/entities/group.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Group, Payment])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
