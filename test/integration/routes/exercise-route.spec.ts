import { Server } from "http"
import request  from "supertest"
import app from "../../../src/app"
import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_UNAUTH } from "../../../src/constants/http"
import { EXERCISE_ROUTE } from "../../../src/constants/routes"
import { BAD_AUTH } from "../../../src/constants/types-error"
import Database from "../../../src/core/database/database"


describe('Exercise route', () => {
    
    let server : Server;
    const db = new Database()
    const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDYyMjg2OTZ9.8fJFkTsxSNp7QIuODT3S0BieIb7MtTMAZLljBO5q72o"

    describe("When the client wants to create an exercise", () => {

        beforeAll(async ()=>{
            server = await app()
            // await db.getConnection().runMigrations()
        })

        afterAll(  (done)=> {
            db.disconnect()
            .then (()=> {
                server.close(done)
            })
                
        })
        
        afterEach(()=> {
            return db.clean("exercise")
        })

        it("(Authentified) should responde a created code as response when the request has all correct fields with correct values and an image file attached", (done) => {
            //SETUP
            const expectedResult = HTTP_CREATED
            const body = {
                name : "exercise-name",
                type : "PDC", 
                description : "Exercise description"
            }

            //ACT
            request(server)
            .post(EXERCISE_ROUTE)
            .field("name", body.name)
            .field("type", body.type)
            .field("description", body.description)
            .attach("picture", "test/utils/assets/link.png")
            .set("authorization", authToken)
            // .expect(expectedResult)
            .end((err, res) => {
                //ASSERT                
                expect(err).toBeNull()
                done()
            })
        })

        it("(Authentified)should responde a positive response code has all correct fields with correct values but without an image file attached  ", (done) => {
            //SETUP
            const expectedResult = HTTP_CREATED
            const body = {
                name : "exercise-name",
                type : "PDC", 
                description : "Exercise description"
            }
            //ACT
            request(server)
            .post(EXERCISE_ROUTE)
            .send(body)
            .set("authorization", authToken)
            .expect(expectedResult)
            .end((err) => { 
                //ASSERT               
                expect(err).toBeNull()
                done()
            })
        })

        it("should responde a negative response code if request hasn't authentification token  ", (done) => {

            const expectedResult = HTTP_UNAUTH
            const body = {
                name : "exercise-name",
                type : "PDC", 
                description : "Exercise description"
            }

            request(server)
            .post(EXERCISE_ROUTE)
            .send(body)
            .expect(expectedResult)
            .end((err, res) => {
                
                expect(err).toBeNull()
                expect(res.body.type).toBe(BAD_AUTH)
                done()
            })
        })

        it("should responde a negative response code if request isn't authentified (but it has a token)  ", (done) => {

            const expectedResult = HTTP_UNAUTH
            const body = {
                name : "exercise-name",
                type : "PDC", 
                description : "Exercise description"
            }

            request(server)
            .post(EXERCISE_ROUTE)
            .set("Authorization", "BAD TOKEN")
            .send(body)
            .expect(expectedResult)
            .end((err, res) => {
                expect(err).toBeNull()
                expect(res.body.type).toBe(BAD_AUTH)
                done()
            })
        })

        it("should responde a bad response code  when the fields are uncorrect", (done) => {

            const expectedResult = HTTP_BAD_REQUEST
            const body = {
                name : "exercise-name",
                tips : "PDC", 
                description : "Exercise description"
            }

            request(server)
            .post(EXERCISE_ROUTE)
            .send(body)
            .expect(expectedResult)
            .end((err) => {
                expect(err).toBeNull()
                done()
            })
        })

        it("should responde a bad response code  when the field values are uncorrect", (done) => {

            const expectedResult = HTTP_BAD_REQUEST
            const body = {
                name : "",
                type : "BAD TYPE", 
                description : "Exercise description"
            }

            request(server)
            .post(EXERCISE_ROUTE)
            .send(body)
            .expect(expectedResult)
            .end((err) => {
                expect(err).toBeNull()
                done()
            })
        })

    })

    // describe('When the client wants to get exercises', () => {
      
    //     it("should responde all exercise ")

    // })
    

})