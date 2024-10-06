import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Lesson } from './lesson.entity';
import { Student } from '../../students/entities/student.entity';

@Entity("attendances")
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.attendances, { onDelete: 'CASCADE' })
  lesson: Lesson;

  @ManyToOne(() => Student, { eager: true })
  student: Student;

  @Column({ default: false }) 
  isPresent: boolean;
}