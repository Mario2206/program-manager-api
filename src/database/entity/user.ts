import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length : 100
    })
    firstname!: string;

    @Column({
        length : 100
    })
    lastname!: string;

    @Column({
        length : 100
    })
    username!: string;

    @Column({
        length : 100
    })
    mail! : string;

    @Column({
        length : 100
    })
    password!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

}