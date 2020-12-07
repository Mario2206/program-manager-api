import {Container} from "inversify"

import ControllerTypes from "./src/abstract/interface/int-middleware"
import ServiceTypes from "./src/abstract/interface/int-service"
import CoreTypes from "./src/abstract/interface/int-core"

import UserController from "./src/controller/user-controller"
import UserService from "./src/services/user-service"
import AuthToken from "./src/core/authentification/auth-token"
import Database from "./src/core/database/database"
import CustomValidation from "./src/core/validation/custom-validation"
import ExerciseService from "./src/services/exercise-service"
import ExerciseController from "./src/controller/exercise-controller"
import EncryptedString from "./src/core/encrypt/encrypted-string"
import ImgUploader from "./src/core/file-management/img-uploader"
import SecurityMiddleware from "./src/core/authentification/security-middleware"
import { IFileManager } from "./src/core/file-management/int-file-manager"
import FileManager from "./src/core/file-management/file-manager"
import { IUserController } from "./src/controller/int-user-controller"
import { ISecurityMiddleware } from "./src/core/authentification/int-security-middleware"
import { IExerciseController } from "./src/controller/int-exercise-controller"
import { IExerciseService } from "./src/services/int-exercise-service"
import { IUserService } from "./src/services/int-user-service"
import { IAuthToken } from "./src/core/authentification/int-auth-token"
import { IDatabase } from "./src/core/database/int-database"
import { ICustomValidation } from "./src/core/validation/int-custom-validation"
import { IEncryptedString } from "./src/core/encrypt/int-encrypted-string"
import { IImgUploader } from "./src/core/file-management/int-img-uploader"

const container = new Container()

//CONTROLLER / MIDDLEWARE
container.bind<IUserController>(ControllerTypes.UserController).to(UserController)
container.bind<IExerciseController>(ControllerTypes.ExerciseController).to(ExerciseController)
container.bind<ISecurityMiddleware>(ControllerTypes.SecurityMiddleware).to(SecurityMiddleware)

//SERVICE
container.bind<IUserService>(ServiceTypes.UserService).to(UserService)
container.bind<IExerciseService>(ServiceTypes.ExerciseService).to(ExerciseService)

//CORE
container.bind<IAuthToken>(CoreTypes.AuthToken).to(AuthToken)
container.bind<IDatabase>(CoreTypes.Database).to(Database)
container.bind<ICustomValidation>(CoreTypes.CustomValidation).to(CustomValidation)
container.bind<IEncryptedString>(CoreTypes.EncryptedString).to(EncryptedString)
container.bind<IImgUploader>(CoreTypes.ImgUploader).to(ImgUploader)
container.bind<IFileManager>(CoreTypes.FileManager).to(FileManager)



export default container