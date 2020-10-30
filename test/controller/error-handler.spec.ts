import httpMocks from "node-mocks-http"
import errorHandler from "../../src/controller/error-handler"
import ErrorService from "../../src/entities/error-service"

describe("Error-Handler", ()=> {

    it("should send a response with status 500 and an error message when he recieves an error", ()=> {

        const expectedMessage = "Error Message"
        const expectedStatus = 500

        const request = httpMocks.createRequest()
        const response = httpMocks.createResponse()
        
        response.json = jest.fn(()=>response)
        response.status = jest.fn(()=>response)

        const error = new ErrorService(expectedStatus,expectedMessage)
                
        errorHandler(error, request, response)
        
        expect(response.json).toHaveBeenCalledWith(expectedMessage)
        expect(response.status).toHaveBeenCalledWith(expectedStatus)
        
        
    })
})