import { Student } from "src/students/entities/student.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Payment } from '../../payment/entities/payment.entity'
import { Lesson } from "src/lesson/entities/lesson.entity";



@Entity("groups")
export class Group {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @CreateDateColumn({ type: 'timestamptz' }) 
    createdAt: Date; 


    @ManyToOne(() => Teacher, (teacher) => teacher.groups)
    teacher: Teacher;

    @ManyToMany(() => Student , (student) => student.groups)
    students: Student[];

    @OneToMany(() => Payment, (payment) => payment.group)
    payments: Payment[];

    @OneToMany(() => Lesson, (lesson) => (lesson.group))
    lessons: Lesson[]
}
