import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';
import { Group } from '../groups/entities/group.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Group, Teacher, Payment])], 
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}