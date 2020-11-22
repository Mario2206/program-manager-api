import { ExerciseSchema } from "../abstract/type/schema-model";
import Database from "../core/database/database";
import customValidate from "../core/validation/validate";
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
        
        await customValidate(exercise)

        return Database.getManager().save(exercise)

    }

}