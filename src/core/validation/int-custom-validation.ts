import ErrorService from "../error/error-service";

export interface ICustomValidation {
    validate(entity : Object) : Promise<ErrorService[]>
}