import { NextFunction, Request, Response } from "express";
import { HTTP_BAD_REQUEST, HTTP_CREATED } from "../constants/http";
import ErrorService from "../core/error/error-service";
import ExerciseService from "../services/exercise-service";

export default class ExerciseController {

    public static async createExercise (req : Request, res : Response, next : NextFunction) : Promise<void> {

        try {

             await ExerciseService.create(req.body)

             res.status(HTTP_CREATED).json("Exercise created")

        } catch (e) {

            next(e instanceof Error ? e : new ErrorService(HTTP_BAD_REQUEST, e) )

        }

    }

}