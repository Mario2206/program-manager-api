import { NextFunction, Request, Response } from "express";
import {check, validationResult} from "express-validator"
import { ValidationChain } from "express-validator/src/chain";
import { middleware } from "../abstract/middleware/middleware";
import { EMPTY_ERROR, MAIL_FORMAT_ERROR, PASSWORD_FORMAT_ERROR } from "../constants/error";
import { HTTP_BAD_REQUEST } from "../constants/http";
import ErrorService from "../entities/error-service";


export default class PostValidator {
    

    public static subscriptionDataValidation () : middleware {
        const validations = [
            check("firstname").notEmpty().withMessage( this.generateErrorMessage("firstname", EMPTY_ERROR)),
            check("lastname").notEmpty().withMessage( this.generateErrorMessage("lastname", EMPTY_ERROR)),
            check("username").notEmpty().withMessage(this.generateErrorMessage("username", EMPTY_ERROR)),
            check("mail").isEmail().normalizeEmail().withMessage( MAIL_FORMAT_ERROR),
            check("password").isLength({min : 5, max : 255}).withMessage( PASSWORD_FORMAT_ERROR),
        ]
        return this.checkErrorValidation(validations)
    }

    private static checkErrorValidation (validations : Array<ValidationChain>) {
        return async (req : Request, res : Response, next : NextFunction) => {

            await Promise.all(validations.map( (validation : ValidationChain) =>validation.run(req)))

            const errors = validationResult(req)

            if(!errors.isEmpty()){
                throw new ErrorService(HTTP_BAD_REQUEST, errors.array().map(error => error.msg))
            }

            next()
        }
    }

    private static generateErrorMessage (concern : string,errorMessage : string) : string {
        return concern + errorMessage
    }

}