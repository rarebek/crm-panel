import { Student } from "src/students/entities/student.entity";
import { Teacher } from "src/teachers/entities/teacher.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity("groups")
export class Group {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;


    @ManyToOne(() => Teacher, (teacher) => teacher.groups)
    teacher: Teacher;

    @ManyToMany(() => Student , (student) => student.groups)
    students: Student[];
}
