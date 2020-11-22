import { NextFunction, Request, Response } from "express";


export interface IUserController {
    subscribeUser(req: Request, res : Response, next : NextFunction) : void,
    login(req: Request, res : Response, next : NextFunction) : void
}


const TYPES = {
    UserController : Symbol.for("IUserController")
}

export default TYPES