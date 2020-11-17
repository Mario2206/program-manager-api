
import ErrorService from "../../src/core/error/error-service"

describe("ErrorService", ()=> {
    it("should be catched if it's thrown, with correct status and error message", ()=> {
        const status = 200
        const message = "error message"
        const error = new ErrorService(status, message)

        try{
            throw error
        }
        catch(e) {
            expect(e).toBe(error)
            expect(e.message).toBe(message)
            expect(e.status).toBe(status)
        }
    })
})