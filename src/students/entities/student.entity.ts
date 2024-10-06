import { Group } from 'src/groups/entities/group.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity("students")
export class Student {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    phone_number: string;

    @Column()
    parent_name: string;

    @Column()
    parent_phone_number: string;

    @Column()
    photo: string;


    @ManyToMany(() => Group, (group) => group.students)
    @JoinTable()
    groups: Group[];
}
