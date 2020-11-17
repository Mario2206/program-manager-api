import {Router} from "express"
import { LOG_ROUTE, SUB_ROUTE } from "../constants/routes"
import UserController from "../controller/user-controller"
import PostProcessor from "../core/middleware/post-processor"

const router = Router()

const requiredKeysForSub = ["firstname", "lastname", 'username', 'mail', 'password']
const requiredKeysForLogin = ["username", "password"]

router.post(SUB_ROUTE, [
    PostProcessor.checkKeys(requiredKeysForSub),
    PostProcessor.filterKeys(requiredKeysForSub),
    UserController.subscribeUser
])

router.post(LOG_ROUTE, [
    PostProcessor.checkKeys(requiredKeysForLogin),
    PostProcessor.filterKeys(requiredKeysForLogin),
    UserController.login
])




export default router