import { ValidationError } from "class-validator";
import { Response, Request, NextFunction } from "express";
import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_SERVER_ERROR, HTTP_SUCCESS } from "../constants/http";
import { USER_CREATED } from "../constants/messages";
import AuthToken from "../core/authentification/auth-token";
import ErrorService from "../core/error/error-service";
import UserService from "../services/user-service";

export default class UserController {


    public static async subscribeUser(req : Request, res : Response, next : NextFunction) : Promise<void> {

        try {
            
            await UserService.register(req.body)
  
            res.status(HTTP_CREATED).json(USER_CREATED)

        }catch(e) {   
            
            next(e instanceof Error ? e : new ErrorService(HTTP_BAD_REQUEST, e))
            
        }
    } 

    public static async login (req : Request, res : Response, next : NextFunction) : Promise<void> {

        try {
            
            await UserService.login(req.body)
                
            const key = process.env.PRIVATE_KEY_FOR_TOKEN ?? ""
            
            const token = new AuthToken(key)
            token.setExpirationDate('24h')
            token.generate()
            
            res.status(HTTP_SUCCESS).header("Authorization", "Bearer " + token.value).json("Connected")
            
        } catch (e) {            
            next(e instanceof Error ? e : new ErrorService(HTTP_BAD_REQUEST, e))
        }
        
    }

}