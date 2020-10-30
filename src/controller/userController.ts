import { NextFunction, Response, Request } from "express";

export default class UserController {

    public subscribeUser(req : Request, res : Response, next : NextFunction) : void {
        res.status(200).json("ok")
    } 

}