import EncryptedString from "../../src/core/encrypt/encrypted-string"


describe('CryptedString entity', () => {

    describe('when crypting a string', () => {
        
        it("should return a crypting value", async () => {

            const text = "NormalText"
            
            const cryptedText = new EncryptedString(text)
            await cryptedText.encrypt()

            expect(cryptedText.value).not.toBe(text)
            expect(cryptedText.value).not.toBe("")

        })

        it("should throw an error if the content is empty", async () => {

            const text = ""
            
            const cryptedText = new EncryptedString(text)

           
            await expect(()=>cryptedText.encrypt()).toThrow(Error) 
            
        })


    })

    describe("When comparing a string value with an encrypted string value", () => {

        it("should return true when the comparison is correct", async () => {

            const text = "NormalText"   

            const encrypted = new EncryptedString(text)
            await encrypted.encrypt()
            const check = await EncryptedString.compare(text, encrypted.value)

            expect(check).toBeTruthy()
        })

        it("should return false when the comparison is uncorrect", async () => {

            const text = "NormalText" 
            const uncorrectText = "uncorrect"  

            const encrypted = new EncryptedString(text)
            await encrypted.encrypt()
            const check = await EncryptedString.compare(uncorrectText, encrypted.value)

            expect(check).toBeFalsy()
        })

    })

})