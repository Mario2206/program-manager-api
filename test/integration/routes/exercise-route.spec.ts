import { Server } from "http"
import request  from "supertest"
import app from "../../../src/app"
import { HTTP_BAD_REQUEST, HTTP_CREATED } from "../../../src/constants/http"
import { EXERCISE_ROUTE } from "../../../src/constants/routes"
import Database from "../../../src/core/database/database"


describe('Exercise route', () => {

    let server : Server;
    const db = new Database()

    describe("When the client wants to create an exercise", () => {

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
            return db.clean("exercise")
        })

        it("should responde a created code as response when the request has all correct fields with correct values and an image file attached", (done) => {

            const expectedResult = HTTP_CREATED
            const body = {
                name : "exercise-name",
                type : "PDC", 
                description : "Exercise description"
            }

            request(server)
            .post(EXERCISE_ROUTE)
            .field("name", body.name)
            .field("type", body.type)
            .field("description", body.description)
            .attach("picture", "test/utils/assets/link.png")
            .expect(expectedResult)
            .end((err) => {
                expect(err).toBeNull()
                done()
            })
        })

        it("should responde a positive response code has all correct fields with correct values but without an image file attached  ", (done) => {

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

        it("should responde a negative response code if request hasn't authentification token  ", (done) => {

            const expectedResult = HTTP_BAD_REQUEST
            const body = {
                name : "exercise-name",
                type : "PDC", 
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