import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { GroupsModule } from './groups/groups.module';
import { FileUploadService } from './minio/minio.service';
import { FileUploadController } from './minio/minio.controller';
import { PaymentsModule } from './payment/payment.module';
import { StatsModule } from './stats/stats.module';
import { LessonsModule } from './lesson/lesson.module';

@Module({
  imports: [CoreModule, StudentsModule, TeachersModule, GroupsModule, PaymentsModule, StatsModule, LessonsModule],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class AppModule {}