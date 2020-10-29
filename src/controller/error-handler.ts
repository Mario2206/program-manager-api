import IEError from "../abstract/entities/IEError";
import {Request, Response} from "express"

export default function errorHandler (error : IEError, req : Request, res : Response) : void {
    res.status(error.status).json(error.message)
}