import Exercise from "../../model/exercise";
import { User } from "../../model/user";
import { ExerciseSchema, UserSchema } from "../type/schema-model";

export interface IUserService {
    register(providedData : UserSchema) : Promise<User>,
    login(userId : {username? : string, mail? : string, password : string}) : Promise<User>,
    find(userId : number) : Promise<User>
}

export interface IExerciseService {
    create ({name, type, image_path, description, owner} : ExerciseSchema) : Promise<Exercise>
}

const TYPES = {
    UserService : Symbol.for("IUserService"),
    ExerciseService : Symbol.for("IExerciseService")
}

export default TYPES