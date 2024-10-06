import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { LoggerModule } from 'src/core/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Teacher, Payment, LoggerModule])],
  controllers: [GroupsController],
  providers: [GroupsService],

})
export class GroupsModule {}
