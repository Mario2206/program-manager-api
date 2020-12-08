import { NextFunction,  Response } from "express";
import { inject, injectable } from "inversify";
import { CustomRequest } from "../../abstract/interface/int-express";
import { HTTP_UNAUTH } from "../../constants/http";
import { BAD_AUTH } from "../../constants/types-error";
import ErrorDetail from "../error/error-detail";
import ErrorService from "../error/error-service";
import CoreTypes from "../../abstract/interface/int-core"
import ServiceTypes from "../../abstract/interface/int-service"
import { ISecurityMiddleware } from "./int-security-middleware";
import { IAuthToken } from "./int-auth-token";
import { IUserService } from "../../services/int-user-service";

@injectable()
export default class SecurityMiddleware implements ISecurityMiddleware{

    private _authToken : IAuthToken
    private _userService : IUserService

    public constructor (@inject(CoreTypes.AuthToken) authToken : IAuthToken, @inject(ServiceTypes.UserService) userService : IUserService ) {
        this._authToken = authToken
        this._userService = userService
    }

    public async authentification (req : CustomRequest, res : Response, next : NextFunction) : Promise<void>{
        
        const token = req.headers.authorization 
        
        if(token) {
           
            
            try {
                const tokenValue = token.split("Bearer")[1].trim()
                
                const { id } = this._authToken.authorize(tokenValue)
                
                req.authClient = await this._userService.find(id)
                
                return next()

            } catch(e) {
                
                return next(new ErrorService(HTTP_UNAUTH, new ErrorDetail(BAD_AUTH, "Authentification token is erroned")))
            }

        }
        
        next(new ErrorService(HTTP_UNAUTH, new ErrorDetail(BAD_AUTH, "No authentification token detected")))
        

    }

}