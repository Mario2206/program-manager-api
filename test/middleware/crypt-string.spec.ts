import CryptString from "../../src/middleware/crypt-string"
import { generateMockRequestResponse } from "../utils"
describe("CryptString", () => {

    describe("When a key name is passed for crypting the corresponding value", () => {

        it("should throw an error when the argument representing the key name is empty", () => {
            const keyname = ""

            const {request, response} = generateMockRequestResponse()
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

            const {request, response} = generateMockRequestResponse({body})
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

            const {request, response} = generateMockRequestResponse({body})
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