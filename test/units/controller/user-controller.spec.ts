import { HTTP_BAD_REQUEST } from "../../../src/constants/http"
import { USER_CREATED } from "../../../src/constants/messages"
import UserController from "../../../src/controller/user-controller"
import ErrorService from "../../../src/core/error/error-service"
import { generateMockRequestResponse } from "../../utils/utils"
import sinon, { createSandbox, createStubInstance } from "sinon"
import ErrorDetail from "../../../src/core/error/error-detail"
import UserService from "../../../src/services/user-service"
import { IUserController } from "../../../src/abstract/interface/int-middleware"
import { IUserService } from "../../../src/abstract/interface/int-service"
import { IAuthToken } from "../../../src/abstract/interface/int-core"
import AuthToken from "../../../src/core/authentification/auth-token"
import Sinon from "sinon"


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

        let userController : IUserController
        let userService : Sinon.SinonStubbedInstance<IUserService>
        let authToken : IAuthToken

        const sandbox = createSandbox()

        beforeEach(()=> {
            userService = sandbox.createStubInstance(UserService)
            authToken = sandbox.createStubInstance(AuthToken)
            userController = new UserController(userService, authToken)
        })

        afterEach(()=> sandbox.restore())

        it("should subcribe the user", async () => {
            const expectedRes = USER_CREATED
            const data = commonData

            userService.register.resolves()

            const [request, response, next] = generateMockRequestResponse({body : data})

            response.json = jest.fn()

            await userController.subscribeUser(request, response, next)

            expect(next).not.toHaveBeenCalled()
            expect(response.json).toHaveBeenCalledWith(expectedRes)
        })

        it("shouldn't subcribe the user if one key is missing", async () => {
        
            const data = {...commonData, firstname : null}

            const [request, response, next] = generateMockRequestResponse({body : data})

            userService.register.rejects(new ErrorDetail("type", "value"))

            await userController.subscribeUser(request, response, next)

            expect(next).toBeCalled()
            expect(next.args[0][0]).toBeInstanceOf(ErrorService)
            expect(next.args[0][0].status).toBe(HTTP_BAD_REQUEST)
        
        })

        it("shouldn't subcribe the user if the mail or username already exist", async () => {
            const data = commonData
            const data2 = {...data, username : "Other"}
            
            const [request, response, next] = generateMockRequestResponse({body : data})

            userService.register.rejects(new ErrorDetail("type", "value"))
            
            await userController.subscribeUser(request, response, next)

            expect(next).toBeCalled()
            expect(next.args[0][0]).toBeInstanceOf(ErrorService)
            expect(next.args[0][0].status).toBe(HTTP_BAD_REQUEST)

        })
    })

    describe("Login", ()=> {

        let userController : IUserController
        let userService : Sinon.SinonStubbedInstance<IUserService>
        let authToken : Sinon.SinonStubbedInstance<IAuthToken>

        const sandbox = createSandbox()

        beforeEach(()=> {
            userService = sandbox.createStubInstance(UserService)
            authToken = sandbox.createStubInstance(AuthToken)
            userController = new UserController(userService, authToken)
        })

        afterEach(()=> sandbox.restore())

        it("should responde an authorization token when the client is authentified", async () => {
            
            const expectedHeader = "Authorization"
            const expectedToken = "token"
            const userData = commonData
            
            
            const [ request, response, next ] = generateMockRequestResponse({body :userData})
            const callbackHeader = sinon.spy((...args)=>response)
            response.header = callbackHeader

            userService.register.resolves()
            authToken.generate.returns(expectedToken)
           
            await userController.login(request, response, next)
        
            expect(callbackHeader.getCall(0).args[0]).toBe(expectedHeader)
            expect(callbackHeader.getCall(0).args[1]).toMatch(expectedToken)
            
        })

        it("should throw an error when the user isn't authentified", async () => {
            
            const userData = { username : "badUsername", password : "badPasss" }
            
            userService.login.rejects(new ErrorDetail("type", "val"))

            const [ request, response ] = generateMockRequestResponse({body :userData})
            const next = sinon.spy()
            
            await userController.login(request, response, next)
            expect(next.getCall(0).args[0]).toBeInstanceOf(ErrorService)

        })

    })

})