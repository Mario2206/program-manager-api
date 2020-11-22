import AuthToken from "../../../../src/core/authentification/auth-token"
import Security from "../../../../src/core/middleware/security"
import sinon from "sinon"
import { generateMockRequestResponse } from "../../../utils/utils"

describe("Security middleware", ()=> {

    describe("When the client has to be authentified", () => {

        it("should insert the payload from token in the request object when it's correct", ()=> {

            const expectedPayload = {payload : "the payload", otherParam : "otherParam"}

            sinon.stub(AuthToken, "authorize").returns(expectedPayload)

            const [req, res, next] = generateMockRequestResponse()

            Security.authentification(req, res, next)

            expect(req.payload).toEqual(expectedPayload)

        })

    })

})