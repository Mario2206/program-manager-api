import { check, ValidationChain } from "express-validator";
import IValidator from "../../abstract/entities/int-validator";

export default class UserLoginValidator implements IValidator {

    public static errors = {
        EMPTY_ERROR : "Some fields are empty"
    }

    private fieldsToValidate = ["username", "password"]

    public get validators () : ValidationChain[] {
        return this.fieldsToValidate.map(this.generateValidationString)
    }

    private generateValidationString(keyname : string) : ValidationChain {
        return check(keyname).notEmpty().withMessage(UserLoginValidator.errors.EMPTY_ERROR)
        
    }

}