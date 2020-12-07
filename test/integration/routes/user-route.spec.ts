import { Server } from "http"
import request  from "supertest"
import app from "../../../src/app"
import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_SUCCESS } from "../../../src/constants/http"
import { LOG_ROUTE, SUB_ROUTE, USER_ROUTE } from "../../../src/constants/routes"
import Database from "../../../src/core/database/database"



describe("user route", () => {
    
    let server : Server;
    const db = new Database()
    describe("Subscribe route", () => {
        
        beforeAll(()=>{
            return app().then((appEntity) => server = appEntity)
        })

        afterAll(  (done)=> {
            db.disconnect()
            .then (()=> {
                server.close(done)
            })
                
        })
        
        afterEach(()=> {
            return db.clean("user")
        })

        it("should send a positive response when the body request is correct",  (done) => {

            const expectedResult = HTTP_CREATED
            const body = {
                firstname : "Mario",
                lastname : "Marsss",
                username : "Mirtille7875",
                mail : "mail@maiel.com",
                password : "superPassword"
            }
            

            request(server)
            .post(USER_ROUTE + SUB_ROUTE)
            .send(body)
            .expect(expectedResult)
            .end((err, res)=> {
                expect(err).toBeNull()
                done()
            })

        })

        it("should send a negative response when the body request is uncorrect", (done) => {

            const expectedResult = HTTP_BAD_REQUEST
            const body = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille7875",
                mail : "",
                password : "superPassword"
            }
            
            request(server)
            .post(USER_ROUTE + SUB_ROUTE)
            .send(body)
            .expect(HTTP_BAD_REQUEST)
            .end((err, res)=>{

                expect(err).toBeNull()
                
                done()
            })

        })
        

    })

    describe("Login route", ()=> {
        
        let server : Server;
        const db = new Database()
        const commonData = {
            username : "Mirtillze78",
            password : "superPassword",
            firstname : "firstname", 
            lastname : "lastname",
            mail : "maizl@mail.com"
        }

        beforeAll(()=>{
            return app().then((appEntity) => server = appEntity)
        })

        afterAll( (done)=> {
            db.disconnect()
            .then (()=> {
                server.close(done)
            })
           
       })
  

        beforeEach((done) => {
            return request(server)
            .post(USER_ROUTE + SUB_ROUTE)
            .send(commonData)
            .end(()=>done())
            
        })

        afterEach(async ()=> {
            await db.clean("user")
        })
        
        it("should return positive response when the request body contains all required values for connection", (done) => {

            const expectedResult = HTTP_SUCCESS
            const body = commonData
            
            request(server)
            .post(USER_ROUTE + LOG_ROUTE)
            .send(body)
            .expect(expectedResult)
            .end((err, res)=> {

                expect(err).toBeNull()
                expect(res.header.authorization).not.toBe("")
                done()
                
            })

        })

    })

})