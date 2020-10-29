import {Request, Response} from "express"
import IEErrorService from "../abstract/entities/IErrorService";

export default function errorHandler (error : IEErrorService, req : Request, res : Response) : void {
    res.status(error.status).json(error.message)
}