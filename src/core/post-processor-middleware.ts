import { NextFunction, Response, Request } from "express";
import { IELitteralObject } from "../abstract/interface/int-common";
import {middleware} from "../abstract/type/type-middleware"
import { HTTP_BAD_REQUEST } from "../constants/http";
import { MISSING_KEYS } from "../constants/types-error";
import ErrorDetail from "./error/error-detail";
import ErrorService from "./error/error-service";

/**
 * Class for processing the body of a request
 */

export default class PostProcessorMiddleware {

    public static errors = {

        FILTER_KEYS_ERROR : "All required keys aren't in the request",

        missing_keys : (keys : string[]) : string => keys.join(", ") + " missing"

    }
    
    /**
     * For checking if all required keys are present in the request body
     * 
     * @param requiredKeys 
     * 
     * return middleware
     */
    public static checkKeys (requiredKeys : Array<string>) : middleware {

        return  (req : Request, res : Response, next : NextFunction) => {
            const body  = req.body
            const postKeys = Object.keys(body)
            const missedKeys = requiredKeys.filter((key)=>!postKeys.includes(key))

            if(missedKeys.length > 0) {
                const errorMessage = new ErrorDetail( MISSING_KEYS ,this.errors.missing_keys(missedKeys))
                next ( new ErrorService(HTTP_BAD_REQUEST, errorMessage ) )
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
    public static filterKeys (requiredKeys : Array<string>) : middleware {

        return (req : Request, res : Response, next : NextFunction) => {
            
            req.body = Object.keys(req.body)
            .filter(key => requiredKeys.includes(key))
            .reduce((body : IELitteralObject, currentKey : string) => (body[currentKey] = req.body[currentKey], body), {})
            
            if(Object.keys(req.body).length !== requiredKeys.length) {
                const error = new ErrorDetail(MISSING_KEYS, PostProcessor.errors.FILTER_KEYS_ERROR)
                next ( new ErrorService(HTTP_BAD_REQUEST, error) )
            }

            next()
        }
    }
}
