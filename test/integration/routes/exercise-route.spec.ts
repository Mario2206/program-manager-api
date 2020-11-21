import { Server } from "http"
import request  from "supertest"
import app from "../../../src/app"
import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_SUCCESS } from "../../../src/constants/http"
import { EXERCISE_ROUTE } from "../../../src/constants/routes"
import Database from "../../../src/core/database/database"


describe('Exercise route', () => {

    let server : Server;

    describe("When the client wants to create an exercise", () => {

        beforeAll(()=>{
            return app().then((appEntity) => server = appEntity)
        })

        afterAll(  (done)=> {
            Database.disconnect()
            .then (()=> {
                server.close(done)
            })
                
        })
        
        afterEach(()=> {
            return Database.clean("exercise")
        })

        it("should responde a created code as response when the exercise data is correct", (done) => {

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

        it("should responde a bad request code as response when the exercise data is uncorrect", () => {

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
            })
        })

    })

})