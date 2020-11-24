import { Router } from "express"
import container from "../../inversify.config"
import { IExerciseController } from "../abstract/interface/int-middleware"

import ControllerTypes from "../abstract/interface/int-middleware"
import CoreTypes, { IImgUploader } from "../abstract/interface/int-core"

const exerciseController = container.get<IExerciseController>(ControllerTypes.ExerciseController)

const router = Router()

router.post("/", container.get<IImgUploader>(CoreTypes.ImgUploader).upload("exercise", "picture"), exerciseController.createExercise.bind(exerciseController))

export default router