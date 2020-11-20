import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Length, IsEmail} from "class-validator"
import { Unique } from "../core/validation/unique";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Length(2, 100)
    firstname!: string;

    @Column()
    @Length(2, 100)
    lastname!: string;

    @Column()
    @Length(5, 100)
    @Unique({
        message : "Username already taken"
    })
    username!: string;

    @Column()
    @IsEmail()
    @Unique({
        message : "Mail already exists"
    })
    mail! : string;

    @Column()
    @Length(5, 100)
    password!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

}