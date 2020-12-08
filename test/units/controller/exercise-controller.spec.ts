import Sinon, { createSandbox, SinonSandbox } from "sinon"

import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_NOT_FOUND, HTTP_SERVER_ERROR, HTTP_SUCCESS } from "../../../src/constants/http"
import { EXO_CREATED } from "../../../src/constants/messages"
import ExerciseController from "../../../src/controller/exercise-controller"
import { IExerciseController } from "../../../src/controller/int-exercise-controller"
import ErrorDetail from "../../../src/core/error/error-detail"
import ErrorService from "../../../src/core/error/error-service"
import FileManager from "../../../src/core/file-management/file-manager"
import Exercise from "../../../src/model/exercise"
import { User } from "../../../src/model/user"
import ExerciseService from "../../../src/services/exercise-service"
import { generateMockRequestResponse } from "../../utils/utils"

describe("Exercise controller", () => {

    const commonData = {
        name : "Exercise name",
        type : "PDC",
        image_path : "/image/",
        description : "Exercise description",
    }

    const sandbox : SinonSandbox = createSandbox()
    let exerciseService : Sinon.SinonStubbedInstance<ExerciseService>
    let fileManager : Sinon.SinonStubbedInstance<FileManager>
    let exerciseController: IExerciseController
    
    beforeEach(()=> {
        exerciseService = sandbox.createStubInstance(ExerciseService)
        fileManager = sandbox.createStubInstance(FileManager)
        exerciseController = new ExerciseController(exerciseService, fileManager)
    })

    describe("When it has to create an exercise", ()=> {

     

        it("should send a postive response when  in the request body includes the fields : name, type, image_path, description and owner ", async ()=> {
            //SETUP 
            const body = commonData
            const [req, res, next] = generateMockRequestResponse(body)
            req.authClient = new User()
          
            exerciseService.create.resolves()
            //ACT
            await exerciseController.createExercise(req, res, next)

            //ASSERT
            expect(res.status).toHaveBeenCalledWith(HTTP_CREATED)
            expect(res.json).toHaveBeenCalledWith(EXO_CREATED)
        })

        it("should send a negative response if the client isn't authentified", async ()=> {
            //SETUP 
            const body = commonData
            const [req, res, next] = generateMockRequestResponse(body)
            
            exerciseService.create.rejects(new ErrorService(HTTP_BAD_REQUEST, new ErrorDetail("type", "value")))

            //ACT
            await exerciseController.createExercise(req, res, next)

            //ASSERT
            expect(next.called).toBeTruthy()
            expect(next.args[0][0].status).toBe(HTTP_SERVER_ERROR)
        })

        it("should send a negative response if some fields are missing", async ()=> {
            //SETUP 
            const body = commonData
            const [req, res, next] = generateMockRequestResponse(body)
            req.authClient = new User()
            
            exerciseService.create.rejects(new ErrorService(HTTP_BAD_REQUEST, new ErrorDetail("type", "value")))

            //ACT
            await exerciseController.createExercise(req, res, next)

            //ASSERT
            expect(next.called).toBeTruthy()
            expect(next.args[0][0].status).toBe(HTTP_BAD_REQUEST)
        })
        

    })

    describe("When it has to send an exercise", () => {

        const exercise = new Exercise()

        it("should responde an exercise when it exists", async ()=> {

            //SETUP
            const [req, res, next] = generateMockRequestResponse()
            req.params.exerciseId = "1"
            exerciseService.getOne.resolves(exercise)

            //ACT
            await exerciseController.getExercise(req, res, next)

            //ASSERT
            expect(res.status).toHaveBeenCalledWith(HTTP_SUCCESS)
            expect(res.json).toHaveBeenCalledWith(exercise)

        })

        it("should send a not found error when it doesn't exist", async () => {
            //SETUP
            const [req, res, next] = generateMockRequestResponse()
            req.params.exerciseId = "1"
            exerciseService.getOne.rejects()

            //ACT
            await exerciseController.getExercise(req, res, next)

            //ASSERT
            expect(next.called).toBeTruthy()
            expect(next.args[0][0].status).toBe(HTTP_NOT_FOUND)
        })

    })

})