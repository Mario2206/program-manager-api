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
            this.createStringValidator("firstname", {min : 1, max : 100}),
            this.createStringValidator("lastname", {min : 1, max : 100}),
            this.createStringValidator("username", {min : 1, max : 20}),
            check("mail").isEmail().normalizeEmail().withMessage(UserSubValidator.errors.MAIL_FORMAT_ERROR),
            this.createStringValidator("password", {min : 1, max : 100}),
        ]
    }

    private createStringValidator (keyname : string, length : {min : number, max : number}) {
        return check(keyname)
        .notEmpty()
        .withMessage( keyname+ UserSubValidator.errors.EMPTY_ERROR)
        .isLength(length)
        .withMessage(`${keyname} must contain between ${length.min} and ${length.max} characters`)
    }
}