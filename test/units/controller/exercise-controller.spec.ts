import Sinon, { createSandbox, SinonSandbox } from "sinon"
import { IExerciseController } from "../../../src/abstract/interface/int-middleware"
import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_SERVER_ERROR } from "../../../src/constants/http"
import { EXO_CREATED } from "../../../src/constants/messages"
import ExerciseController from "../../../src/controller/exercise-controller"
import ErrorDetail from "../../../src/core/error/error-detail"
import ErrorService from "../../../src/core/error/error-service"
import { User } from "../../../src/model/user"
import ExerciseService from "../../../src/services/exercise-service"
import { generateMockRequestResponse } from "../../utils/utils"

describe("Exercise controller", () => {

    describe("When it has to create an exercise", ()=> {

        const commonData = {
            name : "Exercise name",
            type : "PDC",
            image_path : "/image/",
            description : "Exercise description",
        }

        const sandbox : SinonSandbox = createSandbox()
        let exerciseService : Sinon.SinonStubbedInstance<ExerciseService>
        let exerciseController: IExerciseController
        
        beforeEach(()=> {
            exerciseService = sandbox.createStubInstance(ExerciseService)
            exerciseController = new ExerciseController(exerciseService)
        })

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

})