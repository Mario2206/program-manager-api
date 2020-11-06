import {Router} from "express"
import { LOG_ROUTE, SUB_ROUTE } from "../constants/routes"
import UserController from "../controller/user-controller"
import UserLoginValidator from "../entities/validators/user-login-validator"
import UserSubValidator from "../entities/validators/user-sub-validator"
import PostProcessor from "../middleware/post-processor"
import PostValidator from "../middleware/post-validator"

const router = Router()

const requiredKeysForSub = ["firstname", "lastname", 'username', 'mail', 'password']
const requiredKeysForLogin = ["username", "password"]

router.post(SUB_ROUTE, [
    PostProcessor.checkKeys(requiredKeysForSub),
    PostProcessor.filterKeys(requiredKeysForSub),
    PostValidator.validateRequest(new UserSubValidator()),
    UserController.subscribeUser
])

router.post(LOG_ROUTE, [
    PostProcessor.checkKeys(requiredKeysForLogin),
    PostProcessor.filterKeys(requiredKeysForLogin),
    PostValidator.validateRequest(new UserLoginValidator()),
    UserController.login
])




export default router