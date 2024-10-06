import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Group } from '../../groups/entities/group.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.payments, { eager: true }) 
  student: Student;

  @ManyToOne(() => Group, (group) => group.payments, { eager: true }) 
  group: Group;

  @ManyToOne(() => Teacher, (teacher) => teacher.payments, { eager: true }) 
  teacher: Teacher;

  @Column({ type: 'date' }) 
  paymentDate: Date;

  @Column()
  paymentIntentId: string;

  @Column()
  amount: number; 
}