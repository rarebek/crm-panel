import { Group } from "src/groups/entities/group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Payment } from "src/payment/entities/payment.entity";

@Entity("teachers")
export class Teacher {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    phone_number: string;

    @CreateDateColumn({ type: 'timestamptz' }) 
    createdAt: Date;

    @OneToMany(() => Group, (group) => group.teacher)
    groups: Group[];

    @OneToMany(() => Payment, (payment) => payment.teacher)
    payments: Payment[];
}
