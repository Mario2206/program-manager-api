import { HTTP_BAD_REQUEST } from "../../../src/constants/http"
import { MISSING_KEYS } from "../../../src/constants/types-error"
import ErrorDetail from "../../../src/core/error/error-detail"
import ErrorService from "../../../src/core/error/error-service"
import PostProcessor from "../../../src/core/post-processor-middleware"
import { generateMockRequestResponse } from "../../utils/utils"

describe("PostProcessor::checkKeys", ()=> {

    describe("when it's checking if all required keys are in body", () => {
        it("should throw an error when some wanted post keys are missing", ()=> {
            //SETUP
            const expectedKeys = ["name", "firstname", "mail"]
            const post = {name : "mario"}
            const missedKeys = ["firstname", "mail"]
            const expectedMessage = PostProcessor.errors.missing_keys(missedKeys)
            const expectedError = new ErrorService(HTTP_BAD_REQUEST, new ErrorDetail(MISSING_KEYS, expectedMessage))

            const [ request, response, next ] = generateMockRequestResponse({body : post})
            
            //ACT
            PostProcessor.checkKeys(expectedKeys)(request, response, next) 

            //ASSERT
            expect(next.getCall(0).args[0]).toEqual(expectedError)
            
        })

        it("shouldn't throw an error when all wanted post keys are present", ()=> {
            //SETUP
            const expectedKeys = ["name", "firstname", "mail"]
            const post = {name : "mario", firstname : "mars", mail : "mail"}

            const [ request, response, next ] = generateMockRequestResponse({body : post})
    
            //ACT
            PostProcessor.checkKeys(expectedKeys)(request, response, next) 

            //ASSERT
            expect(next.getCall(0).args[0]).toBeUndefined()
            
          
        })
    })

    describe("when it's filtering the request body and cleaning up unwanted keys", ()=> {
        it("should clean a request body with unwanted keys", () => {
            //SETUP
            const expectedKeys = ["name", "firstname", "mail"]
            const body = {name : "mario", firstname : "mars", mail : "mail", sup : "sup"}
            const filteredBody = {name : "mario", firstname : "mars", mail : "mail"}
    
            const [request, response, next ] = generateMockRequestResponse({body})
            
            //ACT
            PostProcessor.filterKeys(expectedKeys)(request, response, next)
            
            //ASSERT
            expect(request.body).toEqual(filteredBody)
            expect(next.called).toBeTruthy()
        })
        
        it("should throw an error when required keys are missing after filtering", () => {
            //SETUP
            const expectedKeys = ["name", "firstname", "mail"]
            const body = { firstname : "mars", mail : "mail", sup : "sup"}
            const expectedErrorMessage = PostProcessor.errors.FILTER_KEYS_ERROR
            const expectedError = new ErrorService(HTTP_BAD_REQUEST, new ErrorDetail( MISSING_KEYS ,expectedErrorMessage ))
    
            const [ request, response, next ] = generateMockRequestResponse({body})
    
            //ACT
            PostProcessor.filterKeys(expectedKeys)(request, response, next)

            //ASSERT
            expect(next.getCall(0).args[0]).toEqual(expectedError)
            
            
        })
    })
})
    

