import {getManager, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../../src/model/user";
import { userSeed } from "../seeds/user.seed";

export class exerciseTesting1606242602350 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository(User).save(userSeed)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    
    }

}
