import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import { Attendance } from './attendance.entity'; 

@Entity("lessons")
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Group, (group) => group.lessons, { eager: true })
  group: Group;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz', nullable: true }) 
  endTime: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.lesson, { cascade: true })
  attendances: Attendance[];
}