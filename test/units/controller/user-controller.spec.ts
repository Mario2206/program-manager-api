import { HTTP_BAD_REQUEST } from "../../../src/constants/http"
import { USER_CREATED } from "../../../src/constants/messages"
import UserController from "../../../src/controller/user-controller"
import ErrorService from "../../../src/core/error/error-service"
import { generateMockRequestResponse } from "../../utils/utils"
import sinon, { createSandbox } from "sinon"
import ErrorDetail from "../../../src/core/error/error-detail"
import UserService from "../../../src/services/user-service"


/**
 * @group user
 */
describe("User controller", () => {

    const commonData = {
        username : "theMirtille78",
        mail : "themail@mail.com",
        password : "superPassword",
        firstname : "firstname",
        lastname : 'lastname'
    }
    describe("Subscription", () => {

        const sandbox = createSandbox()

        afterEach(()=> sandbox.restore())

        it("should subcribe the user", async () => {
            const expectedRes = USER_CREATED
            const data = commonData

            const [request, response, next] = generateMockRequestResponse({body : data})

            sandbox.stub(UserService, "register").resolves()

            response.json = jest.fn()

            await UserController.subscribeUser(request, response, next)

            expect(next).not.toHaveBeenCalled()
            expect(response.json).toHaveBeenCalledWith(expectedRes)
        })

        it("shouldn't subcribe the user if one key is missing", async () => {
        
            const data = {...commonData, firstname : null}

            const [request, response, next] = generateMockRequestResponse({body : data})

            sandbox.stub(UserService, "register").rejects()

            response.json = jest.fn()
            
            await UserController.subscribeUser(request, response, next)

            expect(next).toBeCalled()
            
        
        })

        it("shouldn't subcribe the user if the mail or username already exist", async () => {
            const data = commonData
            const data2 = {...data, username : "Other"}
            
            sandbox.stub(UserService, "register").rejects()

            const [request, response, next] = generateMockRequestResponse({body : data})
            const [request2, response2, next2] = generateMockRequestResponse({body : data2})

            
            await UserController.subscribeUser(request, response, next)
            await UserController.subscribeUser(request2, response2, next2)
            
            expect(next2.called).toBeTruthy()

        })
    })

    describe("Login", ()=> {

        const sandbox = createSandbox()

        afterEach(()=> {
            sandbox.restore()
        })

        it("should responde an authorization token when the client is authentified", async () => {
            
            const expectedHeader = "Authorization"
            const userData = commonData
        
            sandbox.stub(UserService, "login").resolves()
            
            const [ request, response, next ] = generateMockRequestResponse({body :userData})
            const callbackHeader = sinon.spy((...args)=>response)
            response.header = callbackHeader
           
            await UserController.login(request, response, next)
        
            expect(callbackHeader.getCall(0).args[0]).toBe(expectedHeader)
            expect(callbackHeader.getCall(0).args[1].length > 10).toBeTruthy()
            
        })

        it("should throw an error when the user isn't authentified", async () => {
            
            const userData = { username : "badUsername", password : "badPasss" }
            
            sandbox.stub(UserService, "login").rejects(new ErrorService(HTTP_BAD_REQUEST, new ErrorDetail("type", "thing")))

            const [ request, response ] = generateMockRequestResponse({body :userData})
            const next = sinon.spy()
            
            await UserController.login(request, response, next)
            expect(next.getCall(0).args[0]).toBeInstanceOf(ErrorService)

        })

    })

})