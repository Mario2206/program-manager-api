import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IExerciseController } from "../abstract/interface/int-controller";
import { IExerciseService } from "../abstract/interface/int-service";
import { HTTP_BAD_REQUEST, HTTP_CREATED } from "../constants/http";
import ErrorService from "../core/error/error-service";
import ServiceTypes from '../abstract/interface/int-service'

@injectable()
export default class ExerciseController implements IExerciseController {

    private _exerciseService : IExerciseService

    public constructor (@inject(ServiceTypes.ExerciseService) exerciseService : IExerciseService) {
        this._exerciseService = exerciseService
    }

    public async createExercise (req : Request, res : Response, next : NextFunction) : Promise<void> {

        try {
            
            const filename = req.file ? req.file.filename : "default.png"

            const body = {...req.body,image_path : filename}

            console.log(body);
            
            
             await this._exerciseService.create(body)

             res.status(HTTP_CREATED).json("Exercise created")

        } catch (e) {

            next(e instanceof Error ? e : new ErrorService(HTTP_BAD_REQUEST, e) )

        }

    }

}