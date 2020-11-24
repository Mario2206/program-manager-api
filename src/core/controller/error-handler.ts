import {NextFunction, Request, Response} from "express"
import IEErrorService from "../../abstract/interface/int-error";
import { HTTP_SERVER_ERROR } from "../../constants/http";
import ErrorService from "../error/error-service";

export default function errorHandler (error : IEErrorService | Error , req : Request, res : Response, next : NextFunction) : void {          
    if(error instanceof ErrorService) {
        res.status(error.status).json(error.message)
    }  else {
        res.status(HTTP_SERVER_ERROR).json(error.message)
    }
    
}