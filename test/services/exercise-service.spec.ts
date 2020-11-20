import Database from "../../src/core/database/database"
import Exercise from "../../src/model/exercise"
import ExerciseService from "../../src/services/exercise-service"

describe("Exercise service", () => {

    const commonData = {
        name : "Push-up",
        type : "PDC",
        image_path : "/path/",
        description : "The description paragraph"
    }
    describe("When the exercise must be created", () => {

        beforeAll(async ()=> {
            await Database.connect()
        })

        beforeEach(async ()=> {
            await Database.clean("exercise")
        })

        afterAll(async ()=> {
            await Database.disconnect()
        })


        it("should create the exercise when all fields are correct", async ()=> {

            const data = commonData

            const newExercice = await ExerciseService.create(data)

            await expect(Database.getManager().findOneOrFail<Exercise>(Exercise, {name : data.name})).resolves.toEqual(newExercice)

        })

        it("shouldn't create the exercise when exercise type is uncorrect", async (done) => {
            const data = {...commonData, type : "badType"}

            ExerciseService.create(data)
            .then(()=>expect(true).toBeFalsy())
            .catch(e => {                
                expect(e[0].constraints.isOneOf).toBe("Exercise type field has a bad value")
                done()
            })
            

        })

        it("shouldn't create the exercise if it already exist", async (done) => {
            const data = commonData

            await ExerciseService.create(data)

            ExerciseService.create(data)
            .then(()=>expect(true).toBeFalsy())
            .catch(e => {       
                expect(e[0].constraints.Unique).not.toBe(undefined)
                done()
            })

        })

    })

})