import AuthToken from "../../src/core/authentification/auth-token"

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

            const date = "12h"
            const normalToken = new AuthToken(PRIVATE_KEY)
            const tokenWithPayload = new AuthToken(PRIVATE_KEY)
            tokenWithPayload.setExpirationDate(date)

            tokenWithPayload.generate()    
            normalToken.generate()   

            expect(tokenWithPayload.value).not.toBe("")
            expect(tokenWithPayload.value).not.toBe(normalToken.value)

        })

        it("shouldn't return a token with an empty private key", () => {
                const EMPTY_KEY = ""
                expect(()=>new AuthToken(EMPTY_KEY)).toThrowError(AuthToken.errors.CRYPT_KEY_EMPTY)
        })

    })

    describe("When comparing a authorization token", () => {

        it("should return the payload when the token is correct", () => {
            const expectedResult = {username : "Mardio"}
            const token = new AuthToken(PRIVATE_KEY)
            token.setCustomPayload(expectedResult)
            token.generate()

            const result = AuthToken.authorize(token.value, PRIVATE_KEY)
            
            expect(result.username).toBe(expectedResult.username)
        })
        it("should throw an error if the token has expired", () => {
            const token = new AuthToken(PRIVATE_KEY)
            token.setExpirationDate("0")
            token.generate()

            
            expect(()=>AuthToken.authorize(token.value, PRIVATE_KEY)).toThrow(Error)
        })

    })
})