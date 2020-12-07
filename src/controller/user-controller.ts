import { Response, Request, NextFunction } from "express";
import { inject, injectable } from "inversify";

import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_SUCCESS } from "../constants/http";
import { USER_CREATED } from "../constants/messages";
import ControllerTypes from "../abstract/interface/int-service";
import CoreTypes from "../abstract/interface/int-core"

import ErrorService from "../core/error/error-service";
import { IAuthToken } from "../core/authentification/int-auth-token";
import { IUserController } from "./int-user-controller";
import { IUserService } from "../services/int-user-service";

@injectable()
export default class UserController implements IUserController {

    private _userService : IUserService

    private _authToken : IAuthToken
    
    public constructor (
        @inject(ControllerTypes.UserService) userService : IUserService,
        @inject(CoreTypes.AuthToken) authToken : IAuthToken
        ) { 

        this._userService = userService
        this._authToken = authToken
    }   


    public async subscribeUser(req : Request, res : Response, next : NextFunction) : Promise<void> {
    
        try {
            await this._userService.register(req.body)
  
            res.status(HTTP_CREATED).json(USER_CREATED)

        }catch(e) {               
            next(e instanceof Error ? e : new ErrorService(HTTP_BAD_REQUEST, e))
            
        }
    } 

    public async login (req : Request, res : Response, next : NextFunction) : Promise<void> {

        try {
            
            const identifyUser = await this._userService.login(req.body)
                
            this._authToken.setExpirationDate('24h')

            this._authToken.setCustomPayload({id : identifyUser.id})

            const tokenValue = this._authToken.generate()
            
            res.status(HTTP_SUCCESS).header("Authorization", "Bearer " + tokenValue).json("Connected")
            
        } catch (e) {            
            next(e instanceof Error ? e : new ErrorService(HTTP_BAD_REQUEST, e))
        }
        
    }

}