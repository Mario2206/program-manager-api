import PostProcessor from "../../src/middleware/post-processor"
import { generateMockRequestResponse } from "../utils"

describe("PostProcessor::checkKeys", ()=> {

    describe("when it's checking if all required keys are in body", () => {
        it("should throw an error when some wanted post keys are missing", ()=> {

            const expectedKeys = ["name", "firstname", "mail"]
            const post = {name : "mario"}
            const expectedMessage = "firstname, mail missing"

            const {request, response} = generateMockRequestResponse({body : post})
            const next = jest.fn()

            try {
                PostProcessor.checkKeys(expectedKeys)(request, response, next) 
            } catch(e) {            
                expect(e.message).toBe(expectedMessage)
            }
        })

        it("shouldn't throw an error when all wanted post keys are present", (done)=> {

            const expectedKeys = ["name", "firstname", "mail"]
            const post = {name : "mario", firstname : "mars", mail : "mail"}

            const {request, response} = generateMockRequestResponse({body : post})
            const next = jest.fn()

            try {
                PostProcessor.checkKeys(expectedKeys)(request, response, next) 
                done()
            } catch(e) {
                expect(e).toBeNull()
            }
        })
    })

    describe("when it's filtering the request body and cleaning up unwanted keys", ()=> {
        it("should clean a request body with unwanted keys", () => {
            const expectedKeys = ["name", "firstname", "mail"]
            const body = {name : "mario", firstname : "mars", mail : "mail", sup : "sup"}
            const filteredBody = {name : "mario", firstname : "mars", mail : "mail"}
    
            const {request, response} = generateMockRequestResponse({body})
            const next = jest.fn()
    
            PostProcessor.filterKeys(expectedKeys)(request, response, next)
            
            expect(request.body).toEqual(filteredBody)
        })
        
        it("should throw an error when required keys are missing after filtering", () => {
            const expectedKeys = ["name", "firstname", "mail"]
            const body = { firstname : "mars", mail : "mail", sup : "sup"}
            const expectedErrorMessage = PostProcessor.errors.FILTER_KEYS_ERROR
    
            const {request, response} = generateMockRequestResponse({body})
            const next = jest.fn()
    
            try {
                PostProcessor.filterKeys(expectedKeys)(request, response, next)
            } catch(e) {
                expect(e.message).toBe(expectedErrorMessage)
            }
            
        })
    })
})
    

