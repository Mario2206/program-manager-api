import { Server } from "http"
import request  from "supertest"
import app from "../../src/app"
import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_SUCCESS } from "../../src/constants/http"
import { LOG_ROUTE, SUB_ROUTE, USER_ROUTE } from "../../src/constants/routes"
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

        it("should send a positive response when the body request is correct",  () => {

            const expectedResult = HTTP_CREATED
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
            .expect(expectedResult)

        })

        it("should send a negative response when the body request is uncorrect", () => {

            const expectedResult = HTTP_BAD_REQUEST
            const body = {
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }
            
            request(server)
            .post(USER_ROUTE + SUB_ROUTE)
            .send(body)
            .expect(expectedResult)

        })
        

    })

    describe("Login route", ()=> {
        
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
        
        it("should return positive response when the request body contains all required values for connection", () => {

            const expectedResult = HTTP_SUCCESS
            const body = {
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }
            
            request(server)
            .post(USER_ROUTE + LOG_ROUTE)
            .send(body)
            .expect(expectedResult)

        })

    })

})