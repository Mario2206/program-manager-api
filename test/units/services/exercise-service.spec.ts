import Sinon, {   SinonSandbox } from "sinon"
import { ICustomValidation, IDatabase, IEncryptedString } from "../../../src/abstract/interface/int-core"
import { BAD_VALIDATION } from "../../../src/constants/types-error"
import EncryptedString from "../../../src/core/encrypt/encrypted-string"
import ErrorDetail from "../../../src/core/error/error-detail"
import CustomValidation from "../../../src/core/validation/custom-validation"
import ExerciseService from "../../../src/services/exercise-service"
import MockDatabase, { MockEntityManager } from "../../utils/mock-database"

describe("Exercise service", () => {

    const commonData = {
        name : "Push-up",
        type : "PDC",
        image_path : "/path/",
        description : "The description paragraph"
    }

    describe("When the exercise must be created", () => {
        //DEPENDENCY MOCKING
        let mockDb : IDatabase;
        let sandbox : SinonSandbox;
        let fakeEntityManager : any;
        let validator : Sinon.SinonStubbedInstance<ICustomValidation>;
        let encryptedString : IEncryptedString;

        beforeEach(()=> {
             fakeEntityManager = MockEntityManager.create()
             const [db, box] = MockDatabase.create(fakeEntityManager)
             mockDb = db 
             sandbox = box
             validator = sandbox.createStubInstance(CustomValidation)
             encryptedString =sandbox.createStubInstance(EncryptedString)
        })

        afterEach(()=> {
            sandbox.restore()
        })

        
        it("should create the exercise when all fields are correct", async ()=> {

            const data = commonData
            const exerciseService = new ExerciseService(mockDb, validator, encryptedString )

            fakeEntityManager.save.resolvesArg(0)

            try {

                const newExercice = await exerciseService.create(data)
                expect(newExercice.name).toBe(data.name)
                expect(newExercice.type).toBe(data.type)
                expect(newExercice.image_path).toBe(data.image_path)
                expect(newExercice.description).toBe(data.description)

            } catch(e) {                
                expect(e).toBeNull()
            }
            
        })

        it("shouldn't create the exercise when exercise type is uncorrect", async () => {
            const data = {...commonData, type : "badType"}

            validator.validate.rejects([new ErrorDetail(BAD_VALIDATION, "Bad validation")])

            const exerciseService = new ExerciseService(mockDb, validator, encryptedString )

            

            try {
                await exerciseService.create(data)
            } catch (e) {
                expect(e.length).toBe(1)
                expect(e[0]).toBeInstanceOf(ErrorDetail)
                expect(e[0].type).toBe(BAD_VALIDATION)
            }

        })

        it("shouldn't create the exercise if it already exists", async () => {
            const data = commonData

            validator.validate.rejects([new ErrorDetail(BAD_VALIDATION, "Bad validation")])

            const exerciseService = new ExerciseService(mockDb, validator, encryptedString )
            
            

            try {
                await exerciseService.create(data)
            } catch (e) {
                expect(e.length).toBe(1)
                expect(e[0]).toBeInstanceOf(ErrorDetail)
                expect(e[0].type).toBe(BAD_VALIDATION)
            }

        })

        it("shouldn't create the exercise if one (or more) field value is empty ", async () => {
            const data = {...commonData, image_path : ""}

            validator.validate.rejects([new ErrorDetail(BAD_VALIDATION, "Bad validation")])

            const exerciseService = new ExerciseService(mockDb, validator, encryptedString )
            fakeEntityManager.save.rejects()

            try {
                await exerciseService.create(data)
            } catch (e) {
                expect(e.length).toBe(1)
                expect(e[0]).toBeInstanceOf(ErrorDetail)
                expect(e[0].type).toBe(BAD_VALIDATION)
            }

        })

    })

})