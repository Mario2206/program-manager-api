import {Router} from "express"
import { SUB_ROUTE } from "../constants/routes"
import UserController from "../controller/user-controller"
import UserSubValidator from "../entities/user-sub-validator"
import CryptString from "../middleware/crypt-string"
import PostProcessor from "../middleware/post-processor"
import PostValidator from "../middleware/post-validator"

const router = Router()

const requiredKeysForSub = ["firstname", "lastname", 'username', 'mail', 'password']

router.post(SUB_ROUTE, [
    PostProcessor.checkKeys(requiredKeysForSub),
    PostProcessor.filterKeys(requiredKeysForSub),
    CryptString.cryptValue("password"),
    PostValidator.validateRequest(new UserSubValidator()),
    UserController.subscribeUser
])

router.post("/connection")

export default router