import {check, ValidationChain} from "express-validator"
import { EMPTY_ERROR, MAIL_FORMAT_ERROR, PASSWORD_FORMAT_ERROR } from "../constants/error"
import IValidator from "../abstract/entities/int-validator"

export default class UserSubValidator implements IValidator{

    public get validators () : ValidationChain[] {
        return [
            check("firstname").notEmpty().withMessage( "firstname " + EMPTY_ERROR),
            check("lastname").notEmpty().withMessage( "firstname " + EMPTY_ERROR),
            check("username").notEmpty().withMessage( "firstname " + EMPTY_ERROR),
            check("mail").isEmail().normalizeEmail().withMessage( MAIL_FORMAT_ERROR),
            check("password").isLength({min : 5, max : 255}).withMessage( PASSWORD_FORMAT_ERROR),
        ]
    }
}