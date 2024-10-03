import { Group } from "src/groups/entities/group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("teachers")
export class Teacher {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    phone_number: string;

    @OneToMany(() => Group, (group) => group.teacher)
    groups: Group[];
}
