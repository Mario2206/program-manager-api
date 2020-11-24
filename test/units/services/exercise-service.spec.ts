import { BAD_VALIDATION } from "../../../src/constants/types-error"
import ErrorDetail from "../../../src/core/error/error-detail"
import Exercise from "../../../src/model/exercise"
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

        let mockDb : any;
        let fakeEntityManager : any;

        beforeEach(()=> {
             fakeEntityManager = MockEntityManager.create()
             mockDb = new MockDatabase(fakeEntityManager)
        })

        afterEach(()=> {
            mockDb.close()
        })

        
        it("should create the exercise when all fields are correct", async ()=> {

            const data = commonData
            const exerciseService = new ExerciseService()
            fakeEntityManager.save.resolvesArg(0)

            try {

                const newExercice = await ExerciseService.create(data)
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

            fakeEntityManager.save.rejects()

            try {
                await ExerciseService.create(data)
            } catch (e) {
                expect(e.length).toBe(1)
                expect(e[0]).toBeInstanceOf(ErrorDetail)
                expect(e[0].type).toBe(BAD_VALIDATION)
            }

        })

        it("shouldn't create the exercise if it already exists", async () => {
            const data = commonData

            fakeEntityManager.findOne.resolves(new Exercise())
            fakeEntityManager.save.rejects()

            try {
                await ExerciseService.create(data)
            } catch (e) {
                expect(e.length).toBe(1)
                expect(e[0]).toBeInstanceOf(ErrorDetail)
                expect(e[0].type).toBe(BAD_VALIDATION)
            }

        })

        it("shouldn't create the exercise if one (or more) field value is empty ", async () => {
            const data = {...commonData, image_path : ""}

            fakeEntityManager.save.rejects()

            try {
                await ExerciseService.create(data)
            } catch (e) {
                expect(e.length).toBe(1)
                expect(e[0]).toBeInstanceOf(ErrorDetail)
                expect(e[0].type).toBe(BAD_VALIDATION)
            }

        })

    })

})