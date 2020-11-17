import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";
import {Length, IsEmail} from "class-validator"

@Entity()
@Unique("User", ["mail", "username"])
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
    username!: string;

    @Column()
    @IsEmail()
    mail! : string;

    @Column()
    @Length(5, 100)
    password!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

}