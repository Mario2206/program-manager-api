import { HTTP_BAD_REQUEST, HTTP_SERVER_ERROR } from "../../src/constants/http"
import { USER_CREATED } from "../../src/constants/messages"
import UserController from "../../src/controller/user-controller"
import Database from "../../src/database/database"
import ErrorService from "../../src/entities/error-service"
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

        const commonData = {
            firstname : "Marido",
            lastname : "Mars",
            username : "Mirtille78",
            mail : "mail@mail.com",
            password : "superPassword"
        }

        it("should subcribe the user", async () => {
            const expectedRes = USER_CREATED
            const data = commonData

            const [request, response, next] = generateMockRequestResponse({body : data})

            response.json = jest.fn()

            await UserController.subscribeUser(request, response, next)

            expect(response.json).toHaveBeenCalledWith(expectedRes)
        })

        it("shouldn't subcribe the user if one key is missing", async () => {
            const expectedRes =new ErrorService(HTTP_SERVER_ERROR,UserController.errors.SUB)
            const data = {...commonData, firstname : null}

            const [request, response, next] = generateMockRequestResponse({body : data})
            response.json = jest.fn()
            
            await UserController.subscribeUser(request, response, next)

            expect(next).toHaveBeenCalledWith(expectedRes)
            
        
        })

        it("shouldn't subcribe the user if the mail already exist", async () => {
            const expectedRes = new ErrorService(HTTP_BAD_REQUEST,UserController.errors.MAIL)
            const data = commonData
            const data2 = {...data, username : "Other"}
            
            const [request, response, next] = generateMockRequestResponse({body : data})
            const [request2, response2, next2] = generateMockRequestResponse({body : data2})

            
            await UserController.subscribeUser(request, response, next)
            await UserController.subscribeUser(request2, response2, next2)

            expect(next2).toBeCalledWith(expectedRes)

        })

        it("shouldn't subcribe the user if the username already exist", async () => {
            const expectedRes = new ErrorService(HTTP_BAD_REQUEST,UserController.errors.USERNAME)
            const data = commonData
            const data2 = {...data, mail : "Other@mail.com"}
            
            const [request, response, next] = generateMockRequestResponse({body : data})
            const [request2, response2, next2] = generateMockRequestResponse({body : data2})

            
            await UserController.subscribeUser(request, response, next)
            await UserController.subscribeUser(request2, response2, next2)

            expect(next2).toBeCalledWith(expectedRes)

        })

    })

})