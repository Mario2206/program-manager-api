import {UserSchema} from "../abstract/schema-model"
import Database from "../core/database/database"
import {User} from "../model/user"
import EncryptedString from "../core/encrypt/encrypted-string"
import {  validateOrReject } from "class-validator"



export default class UserService {

    public static errors = {
        BAD_USERID : "Bad identification",
        BAD_PASS : "Bad password",
        ABSENCE_KEYS : "Username or mail have to be informed" 
    }

    
    /**
     * For registering a new user in the database
     * 
     * @param providedData 
     * 
     * @return Promise<User>
     * 
     */
    public static async register (providedData : UserSchema) : Promise<User> {
        
        const encryptPassword = new EncryptedString(providedData.password)
        await encryptPassword.encrypt()
        
        const user = new User()
        
        user.lastname = providedData.lastname
        user.firstname = providedData.firstname
        user.username = providedData.username
        user.mail = providedData.mail
        user.password = encryptPassword.value

        await validateOrReject(user)
        
        return Database.getManager().save(user)
    }

    /**
     * To check if the user id  enable to find an user  in the database
     * 
     * @param userId 
     * @param password 
     */
    public static login (userId : {username? : string, mail? : string, password : string}) : Promise<User> {
        
        return new Promise ((resolve, reject) => {

            if(!('username' in userId) && !('mail' in userId)) {
                reject(new Error(UserService.errors.ABSENCE_KEYS))
            }

            const connectId = userId.username ? {username : userId.username} : {mail : userId.mail}
                        
            Database.getManager().findOne(User, connectId)
            .then(async (user : User | undefined) => {
                
                
                if(!user) {
                    return reject(new Error(UserService.errors.BAD_USERID))
                }
                
                
                const check = await EncryptedString.compare(userId.password, user.password)
                
                if(!check) {
                    return reject(new Error(UserService.errors.BAD_PASS))
                }

                resolve(user)  

            })
        })
      
        
    }



}