import { NextFunction, Request, Response } from "express";


export interface IUserController {
    subscribeUser(req: Request, res : Response, next : NextFunction) : void,
    login(req: Request, res : Response, next : NextFunction) : void
}

export interface IExerciseController {
    createExercise (req : Request, res : Response, next : NextFunction) : Promise<void> 
}

const TYPES = {
    UserController : Symbol.for("IUserController"),
    ExerciseController : Symbol.for("IExerciseController")
}

export default TYPES