import PostValidator from "../../src/middleware/post-validator"
import UserSubValidator from "../../src/entities/user-sub-validator"
import { generateMockRequestResponse } from "../utils"

describe("PostValidator", ()=> {
    
    describe("When recieve an user sub validator", ()=> {

        it("should throw an error when some validations are uncorrect",async  () => {

            const expectedErrors = [
                UserSubValidator.errors.PASSWORD_FORMAT_ERROR,
                UserSubValidator.errors.MAIL_FORMAT_ERROR
            ]
            const reqBodyForSub = {
                firstname : "mario",
                lastname : "supertest",
                username : "username",
                mail : "mail",
                password : ""
            }
            const {request, response } = generateMockRequestResponse({body : reqBodyForSub})
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

            const {request, response } = generateMockRequestResponse({body : reqBodyForSub})
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