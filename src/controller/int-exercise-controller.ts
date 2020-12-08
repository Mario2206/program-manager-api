import { NextFunction, Response } from "express";
import { CustomRequest } from "../abstract/interface/int-express";


export interface IExerciseController {
    createExercise (req : CustomRequest, res : Response, next : NextFunction) : Promise<void> 
    getExercise(req : CustomRequest, res : Response, next : NextFunction) : Promise<void>
}