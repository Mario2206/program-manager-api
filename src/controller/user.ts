import { NextFunction, Response } from "express";

export default class User {

    public subscribeUser(req : Request, res : Response, next : NextFunction) : void {
        res.status(200).json("ok")
    } 

}