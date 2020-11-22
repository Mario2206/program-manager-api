import {Router} from "express"
import { LOG_ROUTE, SUB_ROUTE } from "../constants/routes"
import PostProcessor from "../core/middleware/post-processor"
import container from "../../inversify.config"
import { IUserController } from "../abstract/interface/int-controller"
import controllerTypes from "../abstract/interface/int-controller"

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