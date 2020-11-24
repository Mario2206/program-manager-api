import { createSandbox, createStubInstance, SinonSandbox } from "sinon"
import Database from "../../src/core/database/database"
import * as typeorm from "typeorm"
import { IDatabase } from "../../src/abstract/interface/int-core"

/**
 * For mocking Database
 */
export default class MockDatabase {



    public static create (fakeManager : any) : [IDatabase, SinonSandbox] {

        const db = new Database()
        const sandbox = createSandbox()

        sandbox.stub(db, "getManager").returns(fakeManager)

        return [db, sandbox]
    }
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

