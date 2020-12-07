import { NextFunction, Request, Response } from "express";


export interface IExerciseController {
    createExercise (req : Request, res : Response, next : NextFunction) : Promise<void> 
}