import { HTTP_BAD_REQUEST, HTTP_SERVER_ERROR } from "../../src/constants/http"
import { USER_CREATED } from "../../src/constants/messages"
import UserController from "../../src/controller/user-controller"
import Database from "../../src/database/database"
import ErrorService from "../../src/entities/error-service"
import { generateMockRequestResponse } from "../utils"
import sinon from "sinon"

describe("User controller", () => {

    const commonData = {
        username : "Mirtille78",
        mail : "mail@mail.com",
        password : "superPassword",
        firstname : "firstname",
        lastname : 'lastname'
    }
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
            const data = commonData

            const [request, response, next] = generateMockRequestResponse({body : data})

            response.json = jest.fn()

            await UserController.subscribeUser(request, response, next)

            expect(next).not.toHaveBeenCalled()
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

    describe("Login", ()=> {

        beforeAll(async ()=> {
            await Database.connect()
        })

        beforeEach(async ()=> {
            const data = Object.assign({}, commonData)
            const [req,res,next] = generateMockRequestResponse({body : data})
            await UserController.subscribeUser(req,res, next)
            
            
        })

        afterEach(async ()=> {
            await Database.clean("user")
        })

        afterAll(async ()=> {
            await Database.disconnect()
        })

        it("should responde an authorization token when the client is authentified", async () => {
            
            const expectedHeader = "Authorization"
            const userData = commonData
            const [ request, response, next ] = generateMockRequestResponse({body :userData})
            const callbackHeader = sinon.spy((...args)=>response)
            response.header = callbackHeader

            
            await UserController.login(request, response, next)

            expect(next.called).toBeFalsy()
            expect(callbackHeader.getCall(0).args[0]).toBe(expectedHeader)
            expect(callbackHeader.getCall(0).args[1].length > 10).toBeTruthy()
            
        })

        it("should throw an error when the user isn't authentified", async () => {

            const userData = { username : "badUsername", password : "badPasss" }
            
            const [ request, response ] = generateMockRequestResponse({body :userData})
            const next = sinon.spy()
            
            await UserController.login(request, response, next)
            expect(next.getCall(0).args[0]).toBeInstanceOf(ErrorService)
            
            

            
        })

    })

})