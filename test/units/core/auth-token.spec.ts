import AuthToken from "../../../src/core/authentification/auth-token"

describe("Authentification entity", () => {
    
    const PRIVATE_KEY = "PRIVATE_KEY_FOR_TEST"

    describe("When it's creating an authorization token", () => {

        it("should return a token", () => {

            const token = new AuthToken()
            const tokenVal = token.generate()            
            expect(tokenVal).not.toBe("")

        })
        
        it("should return a token with payload", () => {

            const payload = {username : "Mario"}
            const normalToken = new AuthToken()
            const tokenWithPayload = new AuthToken()
            tokenWithPayload.setCustomPayload(payload)

            const tokenWithPayoadVal = tokenWithPayload.generate()    
            const normalTokenVal = normalToken.generate()   

            expect(tokenWithPayoadVal).not.toBe("")
            expect(tokenWithPayoadVal).not.toBe(normalTokenVal)

        })

        it("should return a token with expiration Date", () => {

            const date = "12h"
            const normalToken = new AuthToken()
            const normalTokenValue = normalToken.generate()
            
            const tokenWithPayload = new AuthToken()
            tokenWithPayload.setExpirationDate(date)

            tokenWithPayload.generate()    
            const tokenWithPayloadValue = tokenWithPayload.generate()   

            expect(tokenWithPayloadValue).not.toBe("")
            expect(tokenWithPayloadValue).not.toBe(normalTokenValue)

        })

    })

    describe("When comparing a authorization token", () => {

        it("should return the payload when the token is correct", () => {
            const expectedResult = {username : "Mardio"}
            const token = new AuthToken()
            token.setCustomPayload(expectedResult)
            const tokenValue = token.generate()

            const result = token.authorize(tokenValue)
            
            expect(result.username).toBe(expectedResult.username)
        })
        it("should throw an error if the token has expired", () => {
            const token = new AuthToken()
            token.setExpirationDate("0")
            const tokenValue = token.generate()

            
            expect(()=>token.authorize(tokenValue)).toThrow(Error)
        })

        it("should throw an error when the token is erroned", () => {
            const token = new AuthToken()
            token.setExpirationDate("0")

            
            expect(()=>token.authorize("Bad token")).toThrow(Error)
        })

    })
})