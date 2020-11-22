import {Container} from "inversify"

import ControllerTypes, { IUserController } from "./src/abstract/interface/int-controller"
import ServiceTypes, { IUserService } from "./src/abstract/interface/int-service"
import CoreTypes, { IAuthToken } from "./src/abstract/interface/int-core"

import UserController from "./src/controller/user-controller"
import UserService from "./src/services/user-service"
import AuthToken from "./src/core/authentification/auth-token"

const container = new Container()

container.bind<IUserController>(ControllerTypes.UserController).to(UserController)

container.bind<IUserService>(ServiceTypes.UserService).to(UserService)

container.bind<IAuthToken>(CoreTypes.AuthToken).to(AuthToken)


export default container