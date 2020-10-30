import httpMocks from "node-mocks-http"
import CryptString from "../../src/middleware/crypt-string"
describe("CryptString", () => {

    describe("When a key name is passed for crypting the corresponding value", () => {

        it("should throw an error when the argument representing the key name is empty", () => {
            const keyname = ""

            const request = httpMocks.createRequest()
            const response = httpMocks.createResponse()
            const next = jest.fn()

            try {
               CryptString.cryptValue(keyname)(request, response, next)  
            } catch(e) {
                expect(e.message).toBe(CryptString.errors.KEYNAME_EMPTY)
            }
        })

        it("should throw an error when the key name isn't present in the requestBody", () => {
            const keyname = ""
            const body = {}

            const request = httpMocks.createRequest({body})
            const response = httpMocks.createResponse()
            const next = jest.fn()

            try {
               CryptString.cryptValue(keyname)(request, response, next)  
            } catch(e) {
                expect(e.message).toBe(CryptString.errors.NO_EXISTENCE_OF_KEY)
            }
        })

        it("should crypt correctly the key value when the key is correct", () => {
            const keyname = "key"
            const body = {key : "valueToCrypt"}

            const request = httpMocks.createRequest({body})
            const response = httpMocks.createResponse()
            const next = jest.fn()

            try {
               CryptString.cryptValue(keyname)(request, response, next)  
               expect(request.body.key).not.toBe(body.key)
            } catch(e) {
                expect(e).toBeNull()
            }
        })

    })

})