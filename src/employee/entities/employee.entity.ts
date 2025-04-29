import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    employeeId: number;

    @Column()
    name: string;
    
    @Column({unique:true})
    email: string;

    @Column()
    role: string;

    @Column()
    gender: string;

    @Column()
    contactNumber: string

}
