import { validate } from "class-validator";
import { injectable } from "inversify";
import { resolve } from "path";
import { ICustomValidation } from "../../abstract/interface/int-core";
import { BAD_VALIDATION } from "../../constants/types-error";
import ErrorDetail from "../error/error-detail";
import ErrorService from "../error/error-service";

@injectable()
export default class CustomValidation implements ICustomValidation{

    public validate (entity : Object) : Promise<ErrorService[]> {

        return new Promise((resolve, reject) => {
            validate(entity)
            .then ( errors => {
                if(errors.length > 0) {
                    const parsedErrors = errors.map(err => {
                    
                        if(err.constraints) {
                            const validateKey = Object.keys(err.constraints)[0]
                            
                            return new ErrorDetail(BAD_VALIDATION, err.constraints[validateKey]) 
                        }

                        return  new ErrorDetail(BAD_VALIDATION,"Validation Error") 
                    })
                    reject(parsedErrors)
                }
                resolve()
            })
            .catch((e)=> {
                reject(new ErrorDetail(BAD_VALIDATION,"Error during data Validation"))
            })
        })
    }  
    
}