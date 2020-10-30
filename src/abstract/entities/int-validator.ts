import { ValidationChain } from "express-validator";

export default interface IValidator {
    validators : ValidationChain[]
}