import { Router } from "express"
import container from "../../inversify.config"


import ControllerTypes from "../abstract/interface/int-middleware"
import CoreTypes  from "../abstract/interface/int-core"
import { IExerciseController } from "../controller/int-exercise-controller"
import { ISecurityMiddleware } from "../core/authentification/int-security-middleware"
import { IImgUploader } from "../core/file-management/int-img-uploader"
import { EXERCISE_DIR } from "../../root"

const exerciseController = container.get<IExerciseController>(ControllerTypes.ExerciseController)
const securityMiddleware = container.get<ISecurityMiddleware>(ControllerTypes.SecurityMiddleware)

const router = Router()

router.post("/", 
    securityMiddleware.authentification.bind(securityMiddleware),
    container.get<IImgUploader>(CoreTypes.ImgUploader).upload(EXERCISE_DIR, "picture"), 
    exerciseController.createExercise.bind(exerciseController)
)

router.get("/:exerciseId", 
    securityMiddleware.authentification.bind(securityMiddleware),
    exerciseController.getExercise.bind(exerciseController)
)

export default router