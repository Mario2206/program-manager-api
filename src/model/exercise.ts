import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsOneOf } from "../core/validation/is-one-of";
import { Unique } from "../core/validation/unique";
import Session from "./session"
import { User } from "./user";

@Entity()
export default class Exercise {

    @PrimaryGeneratedColumn()
    id!:number 

    @Column()
    @Unique({
        message : "The exercise name already exist"
    })
    name!: string

    @Column()
    @IsOneOf(["PDC", "Musculation classique", "Street Workout"], {
        message : "The field type of exercise has a bad value"
    })
    type!: string

    @Column()
    @IsNotEmpty()
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

    @ManyToOne(()=>User, user => user.id)
    @JoinTable()
    createdBy!: User

    @ManyToMany(()=>User, user=>user.id)
    @JoinTable()
    owner! : User[]
}