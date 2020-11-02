import { USER_CREATED } from "../../src/constants/messages"
import UserController from "../../src/controller/user-controller"
import Database from "../../src/database/database"
import { generateMockRequestResponse } from "../utils"

describe("User controller", () => {

    describe("Subscription", () => {


        beforeAll(async ()=> {
            await Database.connect()
        })

        afterEach(async ()=> {
            await Database.clean("user")
        })

        afterAll(async ()=> {
            await Database.disconnect()
        })

        it("should subcribe the user", async () => {
            const expectedRes = USER_CREATED
            const data = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }

            const {request, response} = generateMockRequestResponse({body : data})
            response.json = jest.fn()
            await UserController.subscribeUser(request, response)

            expect(response.json).toHaveBeenCalledWith(expectedRes)
        })

        it("shouldn't subcribe the user if one key is missing", async () => {
            const expectedRes = UserController.errors.SUB
            const data = {
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }

            const {request, response} = generateMockRequestResponse({body : data})
            response.json = jest.fn()
            try {
                await UserController.subscribeUser(request, response)
            } catch(e) {
                expect(e.message).toBe(expectedRes)
            }
        
        })

    })

})