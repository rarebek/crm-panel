import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { GraphInspector } from '@nestjs/core';
import { Group } from 'src/groups/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Group])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
