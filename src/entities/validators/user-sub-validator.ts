import {check, ValidationChain} from "express-validator"
import IValidator from "../../abstract/entities/int-validator"



export default class UserSubValidator implements IValidator{

    public static errors = {

        MAIL_FORMAT_ERROR : "Mail isn't correctly formated",

        empty_error : (field : string) : string => field +  " is empty",

        length_error : (keyname : string, {min, max} : {min : number, max : number}) : string => (`${keyname} must contain between ${min} and ${max} characters`)
    }

    public static stringLength = {
        names : {min : 1, max : 100},
        username : {min : 1, max : 20},
        password : {min : 1, max : 100}
    }

    /**
     * For getting userValidators
     */
    public get validators () : ValidationChain[] {
        return [
            this.createStringValidator("firstname", UserSubValidator.stringLength.names),
            this.createStringValidator("lastname", UserSubValidator.stringLength.names),
            this.createStringValidator("username", UserSubValidator.stringLength.username),
            check("mail").isEmail().normalizeEmail().withMessage(UserSubValidator.errors.MAIL_FORMAT_ERROR),
            this.createStringValidator("password", UserSubValidator.stringLength.password),
        ]
    }

    /**
     * For creating common string validators
     * 
     * @param keyname 
     * @param length 
     */
    private createStringValidator (keyname : string, length : {min : number, max : number}) {
        return check(keyname)
        .notEmpty()
        .withMessage( UserSubValidator.errors.empty_error(keyname))
        .isLength(length)
        .withMessage(UserSubValidator.errors.length_error(keyname, length))
    }
}