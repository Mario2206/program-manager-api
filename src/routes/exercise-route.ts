import { Router } from "express"
import container from "../../inversify.config"
import { IExerciseController, ISecurityMiddleware } from "../abstract/interface/int-middleware"

import ControllerTypes from "../abstract/interface/int-middleware"
import CoreTypes, { IImgUploader } from "../abstract/interface/int-core"

const exerciseController = container.get<IExerciseController>(ControllerTypes.ExerciseController)
const securityMiddleware = container.get<ISecurityMiddleware>(ControllerTypes.SecurityMiddleware)

const router = Router()

router.post("/", 
    securityMiddleware.authentification.bind(securityMiddleware),
    container.get<IImgUploader>(CoreTypes.ImgUploader).upload("exercise", "picture"), 
    exerciseController.createExercise.bind(exerciseController)
)

export default router