import { NextFunction, Request, Response } from "express";
import {validationResult} from "express-validator"
import { ValidationChain } from "express-validator/src/chain";
import IValidator from "../abstract/entities/int-validator";
import { middleware } from "../abstract/middleware/type-middleware";
import { HTTP_BAD_REQUEST } from "../constants/http";
import ErrorService from "../entities/error-service";



export default class PostValidator {
    

    public static validateRequest (validator : IValidator) : middleware {
        return this.checkErrorValidation(validator.validators)
    }

    private static checkErrorValidation (validations : Array<ValidationChain>) : middleware {
        return async (req : Request, res : Response, next : NextFunction) => {

            await Promise.all(validations.map( (validation : ValidationChain) =>validation.run(req)))

            const errors = validationResult(req)

            if(!errors.isEmpty()){
                throw new ErrorService(HTTP_BAD_REQUEST, errors.array().map(error => error.msg))
            }

            next()
        }
    }

}