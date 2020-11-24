import EncryptedString from "../../../src/core/encrypt/encrypted-string"


describe('CryptedString entity', () => {

    describe('when crypting a string', () => {
        
        it("should return a crypting value", async () => {

            const text = "NormalText"
            
            const encryptedString = new EncryptedString()
            const encryptedValue = await encryptedString.encrypt(text)

            expect(encryptedValue).not.toBe(text)
            expect(encryptedValue).not.toBe("")

        })

    })

    describe("When comparing a string value with an encrypted string value", () => {

        it("should return true when the comparison is correct", async () => {

            const text = "NormalText"   

            const encrypted = new EncryptedString()
            const encryptedValue = await encrypted.encrypt(text)
            const check = await encrypted.compare(text, encryptedValue)

            expect(check).toBeTruthy()
        })

        it("should return false when the comparison is uncorrect", async () => {

            const text = "NormalText" 
            const uncorrectText = "uncorrect"  

            const encryptedString = new EncryptedString()
            const encryptedValue = await encryptedString.encrypt(text)
            const check = await encryptedString.compare(uncorrectText, encryptedValue)

            expect(check).toBeFalsy()
        })

    })

})