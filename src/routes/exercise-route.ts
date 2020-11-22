import { Router } from "express"
import container from "../../inversify.config"
import { IExerciseController } from "../abstract/interface/int-controller"
import ImgUploader from "../core/uploader/img-uploader"
import ControllerTypes from "../abstract/interface/int-controller"

const exerciseController = container.get<IExerciseController>(ControllerTypes.ExerciseController)

const router = Router()

router.post("/", ImgUploader.upload("exercise", "picture"), exerciseController.createExercise.bind(exerciseController))

export default router