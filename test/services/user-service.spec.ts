import Database from "../../src/database/database"
import { User } from "../../src/database/entity/user"
import UserService from "../../src/services/user-service"

describe("User Service", () => {

    describe("When registering", () => {

        beforeAll(async ()=> {
            await Database.connect()
        })

        afterEach(async ()=> {
            await Database.clean("user")
        })

        afterAll(async ()=> {
            await Database.disconnect()
        })

        it("should register the new User in database if  provided data is correct", async () => {
            const data = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }

            await UserService.register(data)
            const req = await Database.getManager().find<User>(User, data)
            const user = req[0]

            expect(req.length).toBe(1)
            expect(user.firstname).toBe(data.firstname)
            expect(user.lastname).toBe(data.lastname)
            expect(user.username).toBe(data.username)
            expect(user.mail).toBe(data.mail)
            expect(user.password).toBe(data.password)
            
        })

    })

})