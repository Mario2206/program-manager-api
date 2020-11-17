import Database from "../../src/core/database/database"
import Exercise from "../../src/model/exercise"
import ExerciseService from "../../src/services/exercise-service"

describe("Exercise service", () => {

    const commonData = {
        name : "Push-up",
        type : "pdc",
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

            const newUser = await ExerciseService.create(data)

            await expect(Database.getManager().findOneOrFail<Exercise>(Exercise, {name : data.name})).resolves.toEqual(newUser)

        })

        it("shouldn't create the exercise when some fields are uncorrect", async () => {

        })

        it("shouldn't create the exercise if it already exist", () => {
            
        })

    })

})