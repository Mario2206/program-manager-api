import AuthToken from "../../src/entities/auth-token"

describe("Authentification entity", () => {

    const PRIVATE_KEY = "PRIVATE_KEY_FOR_TEST"

    describe("When it's creating an authorization token", () => {

        it("should return a token", () => {

            const token = new AuthToken(PRIVATE_KEY)
            token.generate()            
            expect(token.value).not.toBe("")

        })
        
        it("should return a token with payload", () => {

            const payload = {username : "Mario"}
            const normalToken = new AuthToken(PRIVATE_KEY)
            const tokenWithPayload = new AuthToken(PRIVATE_KEY)
            tokenWithPayload.setCustomPayload(payload)

            tokenWithPayload.generate()    
            normalToken.generate()   

            expect(tokenWithPayload.value).not.toBe("")
            expect(tokenWithPayload.value).not.toBe(normalToken.value)

        })

        it("should return a token with expiration Date", () => {

            const date = "24h"
            const normalToken = new AuthToken(PRIVATE_KEY)
            const tokenWithPayload = new AuthToken(PRIVATE_KEY)
            tokenWithPayload.setExpDate(date)

            tokenWithPayload.generate()    
            normalToken.generate()   

            expect(tokenWithPayload.value).not.toBe("")
            expect(tokenWithPayload.value).not.toBe(normalToken.value)

        })

    })

})