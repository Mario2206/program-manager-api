import {Request, Response} from "express"
import IEErrorService from "../abstract/entities/int-error-service";

export default function errorHandler (error : IEErrorService<string | string[]>, req : Request, res : Response) : void {
    res.status(error.status).json(error.message)
}