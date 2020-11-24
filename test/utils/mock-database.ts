import { createSandbox, createStubInstance, SinonSandbox, SinonStubbedInstance } from "sinon"
import Database from "../../src/core/database/database"
import * as typeorm from "typeorm"
import { IDatabase } from "../../src/abstract/interface/int-core"
import { EntityManager, EntityTarget, Repository } from "typeorm";

/**
 * For mocking Database
 */
export default class MockDatabase implements IDatabase{

    private _sandbox;

    public constructor() {
        this._sandbox = createSandbox()
    }

    public disconnect() : Promise<void>
    public getManager() : EntityManager {
        return this._sandbox.createStubInstance(typeorm.EntityManager)
    }
    public getConnection() : typeorm.Connection {

    }
    public getRepository<Entity>(entityClass : EntityTarget<Entity>) : Repository<Entity>
    public clean(tableName : string) : Promise<void>
}


