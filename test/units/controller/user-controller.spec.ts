import { HTTP_BAD_REQUEST, HTTP_CREATED } from "../../../src/constants/http"
import { USER_CREATED } from "../../../src/constants/messages"
import UserController from "../../../src/controller/user-controller"
import ErrorService from "../../../src/core/error/error-service"
import { generateMockRequestResponse } from "../../utils/utils"
import sinon, { createSandbox } from "sinon"
import ErrorDetail from "../../../src/core/error/error-detail"
import UserService from "../../../src/services/user-service"
import AuthToken from "../../../src/core/authentification/auth-token"
import Sinon from "sinon"
import { User } from "../../../src/model/user"
import { IUserController } from "../../../src/controller/int-user-controller"
import { IUserService } from "../../../src/services/int-user-service"
import { IAuthToken } from "../../../src/core/authentification/int-auth-token"


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

        it("should send a positive response (CREATED CODE)", async () => {
            //SETUP
            const expectedRes = USER_CREATED
            const data = commonData

            userService.register.resolves()

            const [request, response, next] = generateMockRequestResponse({body : data})

            //ACT
            await userController.subscribeUser(request, response, next)

            //ASSERT
            expect(next).not.toHaveBeenCalled()
            expect(response.status).toHaveBeenCalledWith(HTTP_CREATED)
            expect(response.json).toHaveBeenCalledWith(expectedRes)
        })

        it("shouldn't subcribe the user if one key is missing", async () => {
            //SETUP
            const data = {...commonData, firstname : null}

            const [request, response, next] = generateMockRequestResponse({body : data})

            userService.register.rejects(new ErrorDetail("type", "value"))

            //ACT
            await userController.subscribeUser(request, response, next)

            //ASSERT
            expect(next).toBeCalled()
            expect(next.args[0][0]).toBeInstanceOf(ErrorService)
            expect(next.args[0][0].status).toBe(HTTP_BAD_REQUEST)
        
        })

        it("shouldn't subcribe the user if the mail or username already exist", async () => {
            //SETUP
            const data = commonData
            const data2 = {...data, username : "Other"}
            
            const [request, response, next] = generateMockRequestResponse({body : data})

            userService.register.rejects(new ErrorDetail("type", "value"))
            
            //ACT
            await userController.subscribeUser(request, response, next)

            //ASSERT
            expect(next).toBeCalled()
            expect(next.args[0][0]).toBeInstanceOf(ErrorService)
            expect(next.args[0][0].status).toBe(HTTP_BAD_REQUEST)

        })
    })

    describe("Login", ()=> {
        const user = new User()
        user.id = 1

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
            //SETUP
            const expectedHeader = "Authorization"
            const expectedToken = "token"
            const userData = commonData
            
            
            const [ request, response, next ] = generateMockRequestResponse({body :userData})
            const callbackHeader = sinon.spy((...args)=>response)
            response.header = callbackHeader

            userService.login.resolves(user)
            authToken.generate.returns(expectedToken)
            
            //ACT
            await userController.login(request, response, next)
            
            //ASSERT
            expect(callbackHeader.getCall(0).args[0]).toBe(expectedHeader)
            expect(callbackHeader.getCall(0).args[1]).toMatch(expectedToken)
            
        })

        it("should pass an error when the user isn't authentified", async () => {
            //SETUP
            const userData = { username : "badUsername", password : "badPasss" }
            
            userService.login.rejects(new ErrorDetail("type", "val"))

            const [ request, response, next ] = generateMockRequestResponse({body :userData})
            
            //ACT
            await userController.login(request, response, next)

            //ASSERT
            expect(next.getCall(0).args[0]).toBeInstanceOf(ErrorService)

        })

    })

})