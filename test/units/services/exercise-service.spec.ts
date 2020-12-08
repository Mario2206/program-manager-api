import Sinon, {   SinonSandbox } from "sinon"
import { EntityManager } from "typeorm"
import { BAD_VALIDATION } from "../../../src/constants/types-error"
import { IDatabase } from "../../../src/core/database/int-database"
import EncryptedString from "../../../src/core/encrypt/encrypted-string"
import { IEncryptedString } from "../../../src/core/encrypt/int-encrypted-string"
import ErrorDetail from "../../../src/core/error/error-detail"
import CustomValidation from "../../../src/core/validation/custom-validation"
import { ICustomValidation } from "../../../src/core/validation/int-custom-validation"
import Exercise from "../../../src/model/exercise"
import { User } from "../../../src/model/user"
import ExerciseService from "../../../src/services/exercise-service"
import MockDatabase, { MockEntityManager } from "../../utils/mock-database"

describe("Exercise service", () => {

    const commonData = {
        name : "Push-up",
        type : "PDC",
        image_path : "/path/",
        description : "The description paragraph",
        owner : new User()
    }

    let mockDb : IDatabase;
    let sandbox : SinonSandbox;
    let fakeEntityManager : Sinon.SinonStubbedInstance<EntityManager>;
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

    describe("When the exercise must be created", () => {

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

    describe("When it has to return only one exercise", () => {

        const exercise = new Exercise()
        exercise.id = 1
        exercise.name = commonData.name
        exercise.type = commonData.type
        exercise.owner = [commonData.owner]
        exercise.createdBy = commonData.owner
        exercise.image_path = commonData.image_path
        exercise.description = commonData.description

        it("should return an exercise if it exists", async () => {
            //SETUP
            const exerciseService = new ExerciseService(mockDb, validator, encryptedString)
            const exerciseId = exercise.id
            fakeEntityManager.findOneOrFail.resolves(exercise)

            //ACT
            const exoFound = await exerciseService.getOne(exerciseId)

            //ASSERT

            expect(exoFound).toEqual(exercise)            

        })

        it("should throw an error if no exercise is found", async () => {
            //SETUP
            const exerciseService = new ExerciseService(mockDb, validator, encryptedString)
            const exerciseId = exercise.id
            fakeEntityManager.findOneOrFail.rejects()

            //ACT + ASSERT
            await expect(()=> exerciseService.getOne(exerciseId)).rejects.toThrowError()

        })

    })

})