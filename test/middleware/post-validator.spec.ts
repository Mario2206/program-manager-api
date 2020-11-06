import PostValidator from "../../src/middleware/post-validator"

import { generateMockRequestResponse } from "../utils"
import sinon from "sinon"
import UserSubValidator from "../../src/entities/validators/user-sub-validator"
import UserLoginValidator from "../../src/entities/validators/user-login-validator"

describe("PostValidator", ()=> {
    
    describe("When recieves an user sub validator", ()=> {

        it("should throw an error when some validations are uncorrect",async  () => {

            const expectedErrors = [
                UserSubValidator.errors.MAIL_FORMAT_ERROR,
                UserSubValidator.errors.empty_error("password"),
                UserSubValidator.errors.length_error("password", UserSubValidator.stringLength.password)
            ]
            const reqBodyForSub = {
                firstname : "mario",
                lastname : "supertest",
                username : "username",
                mail : "mail",
                password : ""
            }
            const [request, response, next] = generateMockRequestResponse({body : reqBodyForSub})

            const middleware = PostValidator.validateRequest(new UserSubValidator())
            
            await middleware(request, response, next)
            expect(next.getCall(0).args[0].message).toEqual(expect.arrayContaining(expectedErrors))
            
        }) 

        it("shouldn't throw error when all validations are correct", async () => {
            const reqBodyForSub = {
                firstname : "mario",
                lastname : "supertest",
                username : "mario309283",
                mail : "mail@hotmail.com",
                password : "password"
            }

            const [request, response] = generateMockRequestResponse({body : reqBodyForSub})
            const next = sinon.spy()

            const middleware = PostValidator.validateRequest(new UserSubValidator())
            
            await middleware(request,response, next)

            expect(next.getCall(0).args[0]).toBeUndefined()
        })

    })

    describe("When it receives an user login validator", () => {

        it("should throw an error when some validations are uncorrect",async  () => {

            const expectedErrors = [
                UserLoginValidator.errors.EMPTY_ERROR
            ]
            const reqBodyForSub = {
                username : "username",
            }
            const [request, response, next] = generateMockRequestResponse({body : reqBodyForSub})

            const middleware = PostValidator.validateRequest(new UserLoginValidator())
            
            await middleware(request, response, next)
            expect(next.getCall(0).args[0].message).toEqual(expect.arrayContaining(expectedErrors))
            
        }) 

        it("shouldn't throw an error when all validations are correct",async  () => {

            const reqBodyForSub = {
                username : "username",
                password : "password"
            }
            const [request, response, next] = generateMockRequestResponse({body : reqBodyForSub})

            const middleware = PostValidator.validateRequest(new UserLoginValidator())
            
            await middleware(request, response, next)
            expect(next.getCall(0).args[0]).toBeUndefined()
            
        }) 

    })
    
})