import { NextFunction, Response } from "express";
import { inject, injectable } from "inversify";

import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_NOT_FOUND, HTTP_SERVER_ERROR, HTTP_SUCCESS } from "../constants/http";
import ErrorService from "../core/error/error-service";
import ServiceTypes from '../abstract/interface/int-service'
import CoreTypes from "../abstract/interface/int-core"
import { EXO_CREATED } from "../constants/messages";
import { CustomRequest } from "../abstract/interface/int-express";
import ErrorDetail from "../core/error/error-detail";
import { SERVER_ERROR } from "../constants/types-error";
import { IExerciseController } from "./int-exercise-controller";
import { IExerciseService } from "../services/int-exercise-service";
import { IFileManager } from "../core/file-management/int-file-manager";
import ROOT, { EXERCISE_DIR } from "../../root";

@injectable()
export default class ExerciseController implements IExerciseController {

    private _exerciseService : IExerciseService
    private _fileManager : IFileManager

    public constructor (
        @inject(ServiceTypes.ExerciseService) exerciseService : IExerciseService,
        @inject(CoreTypes.FileManager) fileManager : IFileManager
        ) {
        this._exerciseService = exerciseService
        this._fileManager = fileManager
    }

    public async createExercise (req : CustomRequest, res : Response, next : NextFunction) : Promise<void> {
       
        try {
            if(!req.authClient) {
                throw new ErrorService(HTTP_SERVER_ERROR, new ErrorDetail(SERVER_ERROR, "The user isn't authentified in the request"))
            }
        

            const filename = req.file ? req.file.filename : "default.png"

            const body = { ...req.body, image_path : filename, owner : req.authClient }
            
            await this._exerciseService.create(body)

            res.status(HTTP_CREATED).json(EXO_CREATED)

        } catch (e) {
            
            if(req.file) {
                 await this._fileManager.delete(req.file.filename, ROOT + "/" + EXERCISE_DIR)
            }
           
            
            next(e instanceof ErrorService ? e : new ErrorService(HTTP_BAD_REQUEST, e) )

        }

    }

    public async getExercise(req : CustomRequest, res : Response, next : NextFunction) : Promise<void> {
        
        try {
            const exerciseId = req.params.exerciseId 
            const exercise = await this._exerciseService.getOne(exerciseId) 
            res.status(HTTP_SUCCESS).json(exercise) 
        }
        catch(e) {
            next(new ErrorService(HTTP_NOT_FOUND, e))
        }
 
    }

}