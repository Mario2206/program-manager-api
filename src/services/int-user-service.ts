import { UserSchema } from "../abstract/type/schema-model";
import { User } from "../model/user";

export interface IUserService {
    register(providedData : UserSchema) : Promise<User>,
    login(userId : {username? : string, mail? : string, password : string}) : Promise<User>,
    find(userId : number) : Promise<User>
}