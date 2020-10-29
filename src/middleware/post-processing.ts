import { NextFunction, Response, Request } from "express";
import { IELitteralObject } from "../abstract/IECommon";
import {middleware} from "../abstract/middleware/middleware"
import { FILTER_KEYS_ERROR } from "../constants/error";
import { HTTP_BAD_REQUEST, HTTP_SERVER_ERROR } from "../constants/http";
import ErrorService from "../entities/error-service";

/**
 * For checking if all required keys are present in the request body
 * 
 * @param requiredKeys 
 * 
 * return middleware
 */
export function checkKeys (requiredKeys : Array<string>) : middleware {

    return  (req : Request, res : Response, next : NextFunction) => {
        const body  = req.body
        const postKeys = Object.keys(body)
        const missedKeys = requiredKeys.filter((key)=>!postKeys.includes(key))

        if(missedKeys.length > 0) {
            const errorMessage = missedKeys.join(", ") + " missing"
            throw new ErrorService(HTTP_BAD_REQUEST, errorMessage )
        }
        
        next()
        
    }
}
/**
 * For filtering request body and conserving only wanted keys 
 * 
 * @param requiredKeys 
 * 
 * return middleware
 */
export function filterKeys (requiredKeys : Array<string>) : middleware {

    return (req : Request, res : Response, next : NextFunction) => {
        
        req.body = Object.keys(req.body)
        .filter(key => requiredKeys.includes(key))
        .reduce((body : IELitteralObject, currentKey : string) => (body[currentKey] = req.body[currentKey], body), {})
        
        if(Object.keys(req.body).length !== requiredKeys.length) {
            throw new ErrorService(HTTP_SERVER_ERROR, FILTER_KEYS_ERROR)
        }

        next()
    }
}