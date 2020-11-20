import { createSandbox, createStubInstance, SinonSandbox } from "sinon"
import Database from "../../src/core/database/database"
import * as typeorm from "typeorm"

/**
 * For mocking Database
 */
export default class MockDatabase {

    private sandbox: SinonSandbox
    
    constructor(fakeManager : any) {

        this.sandbox = createSandbox()

        this.sandbox.stub(Database, "getManager").returns(fakeManager)
    }

    /**
     * For restoring the sandbox (remove all stubs)
     */
    public close() : void {
         this.sandbox.restore()
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

