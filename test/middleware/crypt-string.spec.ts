import CryptString from "../../src/middleware/crypt-string"
import { generateMockRequestResponse } from "../utils"
describe("CryptString", () => {

    describe("When a key name is passed for crypting the corresponding value",  () => {

        it("should throw an error when the argument is empty", async (done) => {
            const keyname = ""

            const [request, response] = generateMockRequestResponse()
            const next = jest.fn()

            try {
               await CryptString.cryptValue(keyname)(request, response, next)  
            } catch(e) {
                expect(e.message).toBe(CryptString.errors.KEYNAME_EMPTY)
                done()
            }
        })

        it("should throw an error when the key name isn't present in the requestBody", async (done) => {
            const keyname = "test"
            const body = {  }

            const [request, response] = generateMockRequestResponse({body})
            const next = jest.fn()

            try {
               await CryptString.cryptValue(keyname)(request, response, next)  
            } catch(e) {
                expect(e.message).toBe(CryptString.errors.NO_EXISTENCE_OF_KEY)
                done()
            }
        })

        it("should correctly crypt the key value when the key is correct", async (done) => {
            const keyname = "key"
            const valueToCrypt = "valueToCrypt"
            const body = {key : "valueToCrypt"}

            const [request, response] = generateMockRequestResponse({body})
            const next = jest.fn()

            try {
               await CryptString.cryptValue(keyname)(request, response, next)  
               expect(request.body[keyname]).not.toBe(valueToCrypt)
               done()
            } catch(e) {
                console.error(e);
                expect(e).toBeNull()
            }
        })

    })

})