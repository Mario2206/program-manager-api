import { ExerciseSchema } from "../abstract/type/schema-model";
import Exercise from "../model/exercise";
import Service from "./service";

export default class ExerciseService extends Service {

    public static errors = {
        BAD_TYPE : "The exercise has a bad type"
    }

    public async create ({name, type, image_path, description, owner} : ExerciseSchema) : Promise<Exercise> {

        const exercise = new Exercise()
        exercise.name = name 
        exercise.type = type 
        exercise.image_path = image_path
        exercise.description = description
        exercise.owner = [owner]
        
        await this._validator.validate(exercise)

        return this._database.getManager().save(exercise)

    }

}