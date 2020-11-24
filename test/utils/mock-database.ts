import { createSandbox, createStubInstance, SinonSandbox } from "sinon"
import Database from "../../src/core/database/database"
import * as typeorm from "typeorm"
import { IDatabase } from "../../src/abstract/interface/int-core"

/**
 * For mocking Database
 */
export default class MockDatabase implements IDatabase{
    
    public disconnect() : Promise<void>
    public getManager()  {
        return new MockEntityManager();
    }
    public getConnection() : Connection
    public getRepository<Entity>(entityClass : EntityTarget<Entity>) : Repository<Entity>
    public clean(tableName : string) : Promise<void>
}
/**
 * For mocking entiy manager
 */
export class MockEntityManager {
    
    /**
     * For creating fake entityManager (stub)
     */
    public static create () {
        return createStubInstance(typeorm.EntityManager)
    }

}

