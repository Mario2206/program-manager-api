import {UserSchema} from "../abstract/schema-model"
import Database from "../database/database"
import {User} from "../database/entity/user"


export default class UserService {
    
    public static register (providedData : UserSchema) : Promise<User> {
        
        const user = new User()
        
        user.lastname = providedData.lastname
        user.firstname = providedData.firstname
        user.username = providedData.username
        user.mail = providedData.mail
        user.password = providedData.password

        return Database.getManager().save(user)
    }

}