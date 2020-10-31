import {check, ValidationChain} from "express-validator"
import IValidator from "../abstract/entities/int-validator"

export default class UserSubValidator implements IValidator{

    public static errors = {
        MAIL_FORMAT_ERROR : "Mail isn't correctly formated",
        PASSWORD_FORMAT_ERROR : "Password must have a min length of 5 and max length of 255",
        EMPTY_ERROR : "is empty"
    }

    public get validators () : ValidationChain[] {
        return [
            check("firstname").notEmpty().withMessage( "firstname " + UserSubValidator.errors.EMPTY_ERROR),
            check("lastname").notEmpty().withMessage( "firstname " + UserSubValidator.errors.EMPTY_ERROR),
            check("username").notEmpty().withMessage( "firstname " + UserSubValidator.errors.EMPTY_ERROR),
            check("mail").isEmail().normalizeEmail().withMessage(UserSubValidator.errors.MAIL_FORMAT_ERROR),
            check("password").isLength({min : 5, max : 255}).withMessage(UserSubValidator.errors.PASSWORD_FORMAT_ERROR),
        ]
    }
}