import {  validateOrReject } from "class-validator";
import { ExerciseSchema } from "../abstract/schema-model";
import Database from "../core/database/database";
import Exercise from "../model/exercise";

export default class ExerciseService {

    public static errors = {
        BAD_TYPE : "The exercise has a bad type"
    }

    public static async create ({name, type, image_path, description} : ExerciseSchema) : Promise<Exercise> {

        const exercise = new Exercise()
        exercise.name = name 
        exercise.type = type 
        exercise.image_path = image_path
        exercise.description = description

        await validateOrReject(exercise)

        return Database.getManager().save(exercise)

    }

}