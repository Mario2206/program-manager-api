import AuthToken from "../../../src/core/authentification/auth-token"

describe("Authentification entity", () => {
    
    const PRIVATE_KEY = "PRIVATE_KEY_FOR_TEST"

    describe("When it's creating an authorization token", () => {

        it("should return a token", () => {

            const token = new AuthToken()
            token.generate()            
            expect(token.value).not.toBe("")

        })
        
        it("should return a token with payload", () => {

            const payload = {username : "Mario"}
            const normalToken = new AuthToken()
            const tokenWithPayload = new AuthToken()
            tokenWithPayload.setCustomPayload(payload)

            tokenWithPayload.generate()    
            normalToken.generate()   

            expect(tokenWithPayload.value).not.toBe("")
            expect(tokenWithPayload.value).not.toBe(normalToken.value)

        })

        it("should return a token with expiration Date", () => {

            const date = "12h"
            const normalToken = new AuthToken()
            const tokenWithPayload = new AuthToken()
            tokenWithPayload.setExpirationDate(date)

            tokenWithPayload.generate()    
            normalToken.generate()   

            expect(tokenWithPayload.value).not.toBe("")
            expect(tokenWithPayload.value).not.toBe(normalToken.value)

        })

    })

    describe("When comparing a authorization token", () => {

        it("should return the payload when the token is correct", () => {
            const expectedResult = {username : "Mardio"}
            const token = new AuthToken()
            token.setCustomPayload(expectedResult)
            token.generate()

            const result = token.authorize(token.value)
            
            expect(result.username).toBe(expectedResult.username)
        })
        it("should throw an error if the token has expired", () => {
            const token = new AuthToken()
            token.setExpirationDate("0")
            token.generate()

            
            expect(()=>token.authorize(token.value)).toThrow(Error)
        })

    })
})