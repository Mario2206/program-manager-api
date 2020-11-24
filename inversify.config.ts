import {Container} from "inversify"

import ControllerTypes, { IExerciseController, ISecurityMiddleware, IUserController } from "./src/abstract/interface/int-middleware"
import ServiceTypes, { IExerciseService, IUserService } from "./src/abstract/interface/int-service"
import CoreTypes, { IAuthToken, ICustomValidation, IDatabase, IEncryptedString, IImgUploader } from "./src/abstract/interface/int-core"

import UserController from "./src/controller/user-controller"
import UserService from "./src/services/user-service"
import AuthToken from "./src/core/authentification/auth-token"
import Database from "./src/core/database/database"
import CustomValidation from "./src/core/validation/custom-validation"
import ExerciseService from "./src/services/exercise-service"
import ExerciseController from "./src/controller/exercise-controller"
import EncryptedString from "./src/core/encrypt/encrypted-string"
import ImgUploader from "./src/core/uploader/img-uploader"
import SecurityMiddleware from "./src/core/authentification/security-middleware"

const container = new Container()

//CONTROLLER / MIDDLEWARE
container.bind<IUserController>(ControllerTypes.UserController).to(UserController)
container.bind<IExerciseController>(ControllerTypes.ExerciseController).to(ExerciseController)
container.bind<ISecurityMiddleware>(ControllerTypes.SecurityMiddleware).to(SecurityMiddleware)

container.bind<IUserService>(ServiceTypes.UserService).to(UserService)
container.bind<IExerciseService>(ServiceTypes.ExerciseService).to(ExerciseService)

container.bind<IAuthToken>(CoreTypes.AuthToken).to(AuthToken)
container.bind<IDatabase>(CoreTypes.Database).to(Database)
container.bind<ICustomValidation>(CoreTypes.CustomValidation).to(CustomValidation)
container.bind<IEncryptedString>(CoreTypes.EncryptedString).to(EncryptedString)
container.bind<IImgUploader>(CoreTypes.ImgUploader).to(ImgUploader)


export default container