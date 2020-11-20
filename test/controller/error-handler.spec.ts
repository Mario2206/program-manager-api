import httpMocks from "node-mocks-http"
import errorHandler from "../../src/core/controller/error-handler"
import ErrorDetail from "../../src/core/error/error-detail"
import ErrorService from "../../src/core/error/error-service"
import { generateMockRequestResponse } from "../utils/utils"

describe("Error-Handler", ()=> {

    it("should send a response with status 500 and an error message when he recieves an error", ()=> {

        const expectedMessage = "Error Message"
        const expectedStatus = 500

        const [request, response, next] = generateMockRequestResponse()
        
        response.json = jest.fn(()=>response)
        response.status = jest.fn(()=>response)

        const errorType = "errorType"
        const errorDetail = new ErrorDetail(errorType, expectedMessage)
        const error = new ErrorService(expectedStatus,errorDetail)
                
        errorHandler(error, request, response, next)
        
        expect(response.json).toHaveBeenCalledWith(errorDetail)
        expect(response.status).toHaveBeenCalledWith(expectedStatus)
        
        
    })
})