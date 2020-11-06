import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Program {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length : 50
    })
    name!: string

    @Column()
    description!: string
    
    @Column()
    start_date! : Date

    @Column()
    end_date!: Date

    @CreateDateColumn()
    created_at! : Date
}