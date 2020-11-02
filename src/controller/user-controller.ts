import { Response, Request } from "express";
import { HTTP_CREATED, HTTP_SERVER_ERROR } from "../constants/http";
import { USER_CREATED } from "../constants/messages";
import ErrorService from "../entities/error-service";
import UserService from "../services/user-service";

export default class UserController {

    public static errors = {
        SUB : "Error with subscription"
    }

    public static async subscribeUser(req : Request, res : Response) : Promise<void> {

        try {

            await UserService.register(req.body)
            
            res.status(HTTP_CREATED).json(USER_CREATED)

        }catch(e) {

            throw new ErrorService(HTTP_SERVER_ERROR, UserController.errors.SUB)

        }
    } 

}