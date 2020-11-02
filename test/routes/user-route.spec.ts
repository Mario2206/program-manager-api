import request  from "supertest"
import app from "../../src/app"
import { USER_CREATED } from "../../src/constants/messages"
import { SUB_ROUTE, USER_ROUTE } from "../../src/constants/routes"

describe("user route", () => {

    describe("Subscribe route", () => {

        it("should send a positive response when the body request is correct", () => {

            const expectedResult = USER_CREATED
            const body = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }

            request(app)
            .post(USER_ROUTE + SUB_ROUTE)

        })

    })

})