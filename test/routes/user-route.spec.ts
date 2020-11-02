import { Server } from "http"
import request  from "supertest"
import app from "../../src/app"
import { HTTP_BAD_REQUEST, HTTP_CREATED } from "../../src/constants/http"
import { USER_CREATED } from "../../src/constants/messages"
import { SUB_ROUTE, USER_ROUTE } from "../../src/constants/routes"
import Database from "../../src/database/database"



describe("user route", () => {
    
    let server : Server;

    describe("Subscribe route", () => {
        
        beforeAll(async ()=>{
            server = await app()
        })

        afterAll(async (done)=> {
            await Database.disconnect()
            server.close(done)
        })

        afterEach(async ()=> {
            await Database.clean("user")
        })

        it("should send a positive response when the body request is correct", async (done) => {

            const expectedResult = USER_CREATED
            const body = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }
            

            request(server)
            .post(USER_ROUTE + SUB_ROUTE)
            .send(body)
            .expect(HTTP_CREATED)
            .end(async (error : Error,response : request.Response) => {

                if(error) console.error(error)

                expect(response.body).toBe(expectedResult)

                done()
            })
            

        })

        it("should send a negative response when the body request is uncorrect", async (done) => {

            const expectedResult = USER_CREATED
            const body = {
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }
            
            request(server)
            .post(USER_ROUTE + SUB_ROUTE)
            .send(body)
            .expect(HTTP_BAD_REQUEST)
            .end(async (error : Error,response : request.Response) => {

                if(error) console.error(error)

                expect(response.body).not.toBe(expectedResult)

                done()
            })
            

        })

    })

})