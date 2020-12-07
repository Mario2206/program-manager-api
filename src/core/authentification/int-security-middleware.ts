import { NextFunction, Request, Response } from "express";


//MIDLLEWARE
export interface ISecurityMiddleware {
    authentification (req : Request, res : Response, next : NextFunction) :void
}