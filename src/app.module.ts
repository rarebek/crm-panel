import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [CoreModule, StudentsModule, TeachersModule, GroupsModule],
})
export class AppModule {}