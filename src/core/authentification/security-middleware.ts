import { NextFunction,  Response } from "express";

import { injectable } from "inversify";
import { IAuthToken } from "../../abstract/interface/int-core";
import { CustomRequest } from "../../abstract/interface/int-express";
import { ISecurityMiddleware } from "../../abstract/interface/int-middleware";
import { HTTP_UNAUTH } from "../../constants/http";
import { BAD_AUTH } from "../../constants/types-error";
import ErrorDetail from "../error/error-detail";
import ErrorService from "../error/error-service";

@injectable()
export default class SecurityMiddleware implements ISecurityMiddleware{

    private _authToken : IAuthToken

    public constructor (authToken : IAuthToken) {
        this._authToken = authToken
    }

    public authentification (req : CustomRequest, res : Response, next : NextFunction) : void{
        
        const token = req.headers.authorization
       
        
        if(token) {
           
            
            try {
                const tokenValue = token.split("Bearer")[1]
                
                const payload = this._authToken.authorize(tokenValue)
                
                req.payload = payload

                return

            } catch(e) {
                return next(new ErrorService(HTTP_UNAUTH, new ErrorDetail(BAD_AUTH, "Authentification token is erroned")))
            }

            

        }
        
        next(new ErrorService(HTTP_UNAUTH, new ErrorDetail(BAD_AUTH, "No authentification token detected")))
        

    }

}