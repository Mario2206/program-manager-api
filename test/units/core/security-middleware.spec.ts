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

describe("Security middleware", ()=> {

    describe("When the client has to be authentified", () => {

        let authToken : Sinon.SinonStubbedInstance<IAuthToken>
        let sandbox : SinonSandbox
        let securityMiddleware : ISecurityMiddleware

        beforeEach(()=> {
            sandbox = createSandbox()
            authToken = sandbox.createStubInstance(AuthToken)
            securityMiddleware = new SecurityMiddleware(authToken)

        })

        afterEach(()=> {
            sandbox.restore()
        })

        it("should insert the payload from token in the request object when it's correct", ()=> {
            //SETUP
            const expectedPayload = {payload : "the payload", otherParam : "otherParam"}

            authToken.authorize.returns(expectedPayload)

            const [req, res, next] = generateMockRequestResponse()

            req.headers.authorization = "Bearer token"

            //ACT
            securityMiddleware.authentification(req, res, next)

            //ASSERT
            expect(req.payload).toEqual(expectedPayload)

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

    })

})