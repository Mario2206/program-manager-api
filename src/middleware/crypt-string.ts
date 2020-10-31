import bcrypt from "bcrypt"
import { NextFunction } from "express"
import { middleware } from "../abstract/middleware/type-middleware"
import {Request, Response} from "express"
import ErrorService from "../entities/error-service"
import { HTTP_BAD_REQUEST, HTTP_SERVER_ERROR } from "../constants/http"

export default class CryptString {

    public static errors = {
        KEYNAME_EMPTY : "Keyname hasn't to be empty",
        NO_EXISTENCE_OF_KEY : "The key passed doesn't exist in the request"
    }

    public static cryptValue(keyName : string) : middleware {
        
        return async (req : Request, res : Response, next : NextFunction) => {

            if(!keyName) throw new ErrorService(HTTP_SERVER_ERROR, CryptString.errors.KEYNAME_EMPTY)

            if(!req.body[keyName]) throw new ErrorService(HTTP_BAD_REQUEST, CryptString.errors.NO_EXISTENCE_OF_KEY)

            const hash = await bcrypt.hash(req.body[keyName], 10)

            req.body[keyName] = hash

            next()
        }
    }

}   