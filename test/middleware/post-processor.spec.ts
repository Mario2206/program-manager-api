import httpMocks from "node-mocks-http"
import { FILTER_KEYS_ERROR } from "../../src/constants/error"
import PostProcessor from "../../src/middleware/post-processor"

describe("PostProcessor::checkKeys", ()=> {
    it("should throw an error when some wanted post keys are missing", ()=> {

        const expectedKeys = ["name", "firstname", "mail"]
        const post = {name : "mario"}
        const expectedMessage = "firstname, mail missing"

        const request = httpMocks.createRequest({body : post})
        const response = httpMocks.createResponse()
        const next = jest.fn()

        try {
            PostProcessor.checkKeys(expectedKeys)(request, response, next) 
        } catch(e) {            
            expect(e.message).toBe(expectedMessage)
        }
    })

    it("should throw an error when some wanted post keys are missing", (done)=> {

        const expectedKeys = ["name", "firstname", "mail"]
        const post = {name : "mario", firstname : "mars", mail : "mail"}

        const request = httpMocks.createRequest({body : post})
        const response = httpMocks.createResponse()
        const next = jest.fn()

        try {
            PostProcessor.checkKeys(expectedKeys)(request, response, next) 
           done()
        } catch(e) {
            expect(e).toBeNull()
        }
    })
})

describe("PostProcessor::filterKeys", ()=> {
    it("should clean a request body with unwanted keys", () => {
        const expectedKeys = ["name", "firstname", "mail"]
        const body = {name : "mario", firstname : "mars", mail : "mail", sup : "sup"}
        const filteredBody = {name : "mario", firstname : "mars", mail : "mail"}

        const request = httpMocks.createRequest({body})
        const response = httpMocks.createResponse()
        const next = jest.fn()

        PostProcessor.filterKeys(expectedKeys)(request, response, next)
        
        expect(request.body).toEqual(filteredBody)
    })
    
    it("should throw an error when required keys are missing after filtering", () => {
        const expectedKeys = ["name", "firstname", "mail"]
        const body = { firstname : "mars", mail : "mail", sup : "sup"}
        const expectedErrorMessage = FILTER_KEYS_ERROR

        const request = httpMocks.createRequest({body})
        const response = httpMocks.createResponse()
        const next = jest.fn()

        try {
            PostProcessor.filterKeys(expectedKeys)(request, response, next)
        } catch(e) {
            expect(e.message).toBe(expectedErrorMessage)
        }
        
    })
})