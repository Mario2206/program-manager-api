import { ExerciseSchema } from "../abstract/type/schema-model";
import Exercise from "../model/exercise";

export interface IExerciseService {
    create ({name, type, image_path, description, owner} : ExerciseSchema) : Promise<Exercise>
}