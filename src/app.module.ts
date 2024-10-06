import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { GroupsModule } from './groups/groups.module';
import { MinioService } from './minio/minio.service';

@Module({
  imports: [CoreModule, StudentsModule, TeachersModule, GroupsModule],
  providers: [MinioService],
})
export class AppModule {}