import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Session from "../entity/session"

@Entity()
export default class Exercise {

    @PrimaryGeneratedColumn()
    id!:number 

    @Column()
    name!: string

    @Column()
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