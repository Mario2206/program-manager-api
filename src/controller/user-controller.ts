import { Response, Request, NextFunction } from "express";
import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_SERVER_ERROR } from "../constants/http";
import { USER_CREATED } from "../constants/messages";
import ErrorService from "../entities/error-service";
import UserService from "../services/user-service";

export default class UserController {

    public static errors = {
        SUB : "Error with subscription",
        MAIL : "Mail already exist",
        USERNAME : "Username already exist"
    }

    public static async subscribeUser(req : Request, res : Response, next : NextFunction) : Promise<void> {

        try {

            const uniqueMail = await UserService.checkUniqueness({mail : req.body.mail})
            const uniqueUsername = await UserService.checkUniqueness({username : req.body.username})

            if(!uniqueMail || !uniqueUsername) {
                const error = new ErrorService(
                    HTTP_BAD_REQUEST, 
                    !uniqueMail ? UserController.errors.MAIL : UserController.errors.USERNAME
                    )
                    
                return next(error)
            }

            await UserService.register(req.body)
            
            res.status(HTTP_CREATED).json(USER_CREATED)

        }catch(e) {
            
            next(new ErrorService(HTTP_SERVER_ERROR, UserController.errors.SUB))
            
        }
    } 

}