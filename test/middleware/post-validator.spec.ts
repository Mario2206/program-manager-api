import { MAIL_FORMAT_ERROR, PASSWORD_FORMAT_ERROR } from "../../src/constants/error"
import PostValidator from "../../src/middleware/post-validator"
import httpMocks from "node-mocks-http"


describe("PostValidator :: subscriptionDataValidation", ()=> {
    it("should throw an error when some validations are uncorrect",async  () => {

        const expectedErrors = [PASSWORD_FORMAT_ERROR,MAIL_FORMAT_ERROR]
        const reqBodyForSub = {
            firstname : "mario",
            lastname : "supertest",
            username : "username",
            mail : "mail",
            password : ""
        }

        const request = httpMocks.createRequest({body : reqBodyForSub}) 
        const response = httpMocks.createResponse() 
        const nextmock = jest.fn()

        const middleware = PostValidator.subscriptionDataValidation()
        
        try {
        
            await middleware(request, response, nextmock)
            
        }
        catch(e) {            
            expect(e.message).toEqual(expect.arrayContaining(expectedErrors))
        }
    })
})