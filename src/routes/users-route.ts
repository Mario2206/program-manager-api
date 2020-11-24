import {Router} from "express"
import { LOG_ROUTE, SUB_ROUTE } from "../constants/routes"
import PostProcessor from "../core/post-processor-middleware"
import container from "../../inversify.config"
import { IUserController } from "../abstract/interface/int-middleware"
import controllerTypes from "../abstract/interface/int-middleware"

const router = Router()

const requiredKeysForSub = ["firstname", "lastname", 'username', 'mail', 'password']
const requiredKeysForLogin = ["username", "password"]
const userController = container.get<IUserController>(controllerTypes.UserController)



router.post(SUB_ROUTE, [
    PostProcessor.checkKeys(requiredKeysForSub),
    PostProcessor.filterKeys(requiredKeysForSub),
    userController.subscribeUser.bind(userController)
])

router.post(LOG_ROUTE, [
    PostProcessor.checkKeys(requiredKeysForLogin),
    PostProcessor.filterKeys(requiredKeysForLogin),
    userController.login.bind(userController)
])




export default router