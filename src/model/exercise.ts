import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsOneOf } from "../core/validation/is-one-of";
import { Unique } from "../core/validation/unique";
import Session from "./session"

@Entity()
export default class Exercise {

    @PrimaryGeneratedColumn()
    id!:number 

    @Column()
    @Unique()
    name!: string

    @Column()
    @IsOneOf(["PDC", "Musculation classique", "Street Workout"], {
        message : "Exercise type field has a bad value"
    })
    type!: string

    @Column()
    image_path!: string 

    @Column()
    description!: string 

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn() 
    update_at!: Date

    @ManyToMany(()=> Session, session => session.id)
    @JoinTable()
    sessions!: Session[]
}