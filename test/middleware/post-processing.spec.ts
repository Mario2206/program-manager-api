import { mockRequest, mockResponse } from "mock-req-res"
import { FILTER_KEYS_ERROR } from "../../src/constants/error"
import { checkKeys, filterKeys } from "../../src/middleware/post-processing"

describe("checkKeys", ()=> {
    it("should throw an error when some wanted post keys are missing", ()=> {

        const expectedKeys = ["name", "firstname", "mail"]
        const post = {name : "mario"}
        const expectedMessage = "firstname, mail missing"

        const request = mockRequest({body : post})
        const response = mockResponse()
        const next = jest.fn()

        try {
           checkKeys(expectedKeys)(request, response, next) 
        } catch(e) {            
            expect(e.message).toBe(expectedMessage)
        }
    })

    it("should throw an error when some wanted post keys are missing", (done)=> {

        const expectedKeys = ["name", "firstname", "mail"]
        const post = {name : "mario", firstname : "mars", mail : "mail"}

        const request = mockRequest({body : post})
        const response = mockResponse()
        const next = jest.fn()

        try {
           checkKeys(expectedKeys)(request, response, next) 
           done()
        } catch(e) {
            expect(e).toBeNull()
        }
    })
})

describe("filterKeys", ()=> {
    it("should clean a request body with unwanted keys", () => {
        const expectedKeys = ["name", "firstname", "mail"]
        const body = {name : "mario", firstname : "mars", mail : "mail", sup : "sup"}
        const filteredBody = {name : "mario", firstname : "mars", mail : "mail"}

        const request = mockRequest({body})
        const response = mockResponse()
        const next = jest.fn()

        filterKeys(expectedKeys)(request, response, next)
        
        expect(request.body).toEqual(filteredBody)
    })
    
    it("should throw an error when required keys are missing after filtering", () => {
        const expectedKeys = ["name", "firstname", "mail"]
        const body = { firstname : "mars", mail : "mail", sup : "sup"}
        const expectedErrorMessage = FILTER_KEYS_ERROR

        const request = mockRequest({body})
        const response = mockResponse()
        const next = jest.fn()

        try {
            filterKeys(expectedKeys)(request, response, next)
        } catch(e) {
            expect(e.message).toBe(expectedErrorMessage)
        }
        
    })
})