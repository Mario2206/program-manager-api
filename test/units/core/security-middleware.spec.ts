import AuthToken from "../../../src/core/authentification/auth-token"
import  { createSandbox, SinonSandbox } from "sinon"
import { generateMockRequestResponse } from "../../utils/utils"
import { IAuthToken } from "../../../src/abstract/interface/int-core"
import Sinon from "sinon"
import { ISecurityMiddleware } from "../../../src/abstract/interface/int-middleware"
import SecurityMiddleware from "../../../src/core/authentification/security-middleware"
import ErrorService from "../../../src/core/error/error-service"
import { HTTP_UNAUTH } from "../../../src/constants/http"
import ErrorDetail from "../../../src/core/error/error-detail"
import { BAD_AUTH } from "../../../src/constants/types-error"
import { User } from "../../../src/model/user"
import { IUserService } from "../../../src/abstract/interface/int-service"
import UserService from "../../../src/services/user-service"

describe("Security middleware", ()=> {

    describe("When the client has to be authentified", () => {

        let authToken : Sinon.SinonStubbedInstance<IAuthToken>
        let sandbox : SinonSandbox
        let securityMiddleware : ISecurityMiddleware
        let userService : Sinon.SinonStubbedInstance<IUserService>

        beforeEach(()=> {
            sandbox = createSandbox()
            authToken = sandbox.createStubInstance(AuthToken)
            userService = sandbox.createStubInstance(UserService)
            securityMiddleware = new SecurityMiddleware(authToken, userService)
        })

        afterEach(()=> {
            sandbox.restore()
        })

        it("should insert the authentified client in the request object when the token is correct", async ()=> {
            //SETUP
            const expectedAuthUser = new User()
            expectedAuthUser.firstname = "firstname"
            expectedAuthUser.lastname = "lastname"
            expectedAuthUser.username = "Mario"
            expectedAuthUser.mail = "mario@mail.com"
            expectedAuthUser.password = "password"

            const [req, res, next] = generateMockRequestResponse()
            
            req.headers.authorization = "Bearer token"
            
            userService.find.resolves(expectedAuthUser)
            authToken.authorize.returns({id : 1})

            //ACT
            await securityMiddleware.authentification(req, res, next)
            
            
            //ASSERT
            expect(req.authClient).toEqual(expectedAuthUser)
            
        })

        it("should next when the token is undefined or empty", ()=> {
            //SETUP
            const expectedError = new ErrorService(HTTP_UNAUTH, new ErrorDetail(BAD_AUTH, "No authentification token detected"))

            const [req, res, next] = generateMockRequestResponse()

            req.headers.authorization = ""

            //ACT
            securityMiddleware.authentification(req, res, next)

            //ASSERT
            expect(next.called).toBeTruthy()
            expect(next.args[0][0]).toEqual(expectedError)
        })

        it("should next when the token is erroned", () => {
            //SETUP 
            const expectedError = new ErrorService(HTTP_UNAUTH, new ErrorDetail(BAD_AUTH, "Authentification token is erroned"))
            const [req, res, next] = generateMockRequestResponse()

            req.headers.authorization = "BAD TOKEN"

            authToken.authorize.throws()
            //ACT 
            securityMiddleware.authentification(req, res, next)

            //ASSERT 
            expect(next.called).toBeTruthy()
            expect(next.args[0][0]).toEqual(expectedError)
        })

        it("should next when the user isn't found", () => {
            //SETUP 
            const expectedError = new ErrorService(HTTP_UNAUTH, new ErrorDetail(BAD_AUTH, "Authentification token is erroned"))
            const [req, res, next] = generateMockRequestResponse()

            req.headers.authorization = "BAD TOKEN"

            userService.find.throws()
            authToken.authorize.rejects({id : 1})

            //ACT 
            securityMiddleware.authentification(req, res, next)

            //ASSERT 
            expect(next.called).toBeTruthy()
            expect(next.args[0][0]).toEqual(expectedError)
        })

    })

})