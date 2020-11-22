import { User } from "../../model/user";
import { UserSchema } from "../type/schema-model";

export interface IUserService {
    register(providedData : UserSchema) : Promise<User>,
    login(userId : {username? : string, mail? : string, password : string}) : Promise<User>
}


const TYPES = {
    UserService : Symbol.for("IUserService")
}

export default TYPES