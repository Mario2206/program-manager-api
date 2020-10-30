import { MAIL_FORMAT_ERROR, PASSWORD_FORMAT_ERROR } from "../../src/constants/error"
import PostValidator from "../../src/middleware/post-validator"
import httpMocks from "node-mocks-http"
import UserSubValidator from "../../src/entities/user-sub-validator"


describe("PostValidator", ()=> {
    
    describe("When recieve an user sub validator", ()=> {

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

            const middleware = PostValidator.validateRequest(new UserSubValidator())
            
            try {
            
                await middleware(request, response, nextmock)
                
            }
            catch(e) {            
                expect(e.message).toEqual(expect.arrayContaining(expectedErrors))
            }
        }) 

        it("shouldn't throw error when all validations are correct", async (done) => {
            const reqBodyForSub = {
                firstname : "mario",
                lastname : "supertest",
                username : "username",
                mail : "mail@hotmail.com",
                password : "password"
            }

            const request = httpMocks.createRequest({body : reqBodyForSub}) 
            const response = httpMocks.createResponse() 
            const nextmock = jest.fn()

            const middleware = PostValidator.validateRequest(new UserSubValidator())
            
            try {
            
                await middleware(request, response, nextmock)
                done()
                
            }
            catch(e) {            
                expect(e).toBeNull()
            }
        })

    })
    
})