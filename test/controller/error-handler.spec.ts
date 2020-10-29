import { mockRequest, mockResponse } from "mock-req-res"
import errorHandler from "../../src/controller/error-handler"
import Error from "../../src/entities/Error"

describe("Error-Handler", ()=> {

    it("should send a response with status 500 and an error message when he recieves an error", ()=> {

        const expectedMessage = "Error Message"
        const expectedStatus = 500

        const request = mockRequest()
        const response = mockResponse()
        const error = new Error(expectedStatus,expectedMessage)

        
        errorHandler(error, request, response)
        
        expect(response.json).toHaveBeenCalledWith(expectedMessage)
        expect(response.status).toHaveBeenCalledWith(expectedStatus)
        
        
    })
})