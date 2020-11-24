import { NextFunction, Request, Response } from "express";

//CONTROLLER
export interface IUserController {
    subscribeUser(req: Request, res : Response, next : NextFunction) : Promise<void>,
    login(req: Request, res : Response, next : NextFunction) : Promise<void>
}

export interface IExerciseController {
    createExercise (req : Request, res : Response, next : NextFunction) : Promise<void> 
}

//MIDLLEWARE
export interface ISecurityMiddleware {
    authentification (req : Request, res : Response, next : NextFunction) :void
}

const TYPES = {
    UserController : Symbol.for("IUserController"),
    ExerciseController : Symbol.for("IExerciseController"),
    SecurityMiddleware : Symbol.for("ISecurityMiddleware")
}

export default TYPES