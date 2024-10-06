import { Group } from 'src/groups/entities/group.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Payment } from '../../payment/entities/payment.entity';

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

    @CreateDateColumn({ type: 'timestamptz' }) 
    createdAt: Date;
  
    @DeleteDateColumn({ type: 'timestamptz' }) 
    leftAt: Date;
  
    @OneToMany(() => Payment, (payment) => payment.student)
    payments: Payment[];


    @ManyToMany(() => Group, (group) => group.students)
    @JoinTable()
    groups: Group[];
}
