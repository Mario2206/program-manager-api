import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Program from "./program";

@Entity()
export default class Session {

    @PrimaryGeneratedColumn()
    id!: number 

    @Column({
        length: 50
    })
    name!: string

    @Column({
        length : 20
    })
    type!: string

    @Column()
    duration!: Date

    @ManyToMany(()=> Program, program => program.id)
    @JoinTable()
    programs!: Program[]
}