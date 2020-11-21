import { Router } from "express"
import ExerciseController from "../controller/exercise-controller"
import ImgUploader from "../core/uploader/img-uploader"


const router = Router()

router.post("/", ImgUploader.upload("exercise", "picture"), ExerciseController.createExercise)

export default router