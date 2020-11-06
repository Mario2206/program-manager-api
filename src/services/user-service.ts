import { IELitteralObject } from "../abstract/int-common"
import {UserSchema} from "../abstract/schema-model"
import Database from "../database/database"
import {User} from "../database/entity/user"
import EncryptedString from "../entities/encrypted-string"



export default class UserService {

    public static errors = {
        BAD_USERID : "Bad identification",
        BAD_PASS : "Bad password",
        ABSENCE_KEYS : "Username or mail have to be informed" 
    }

    /**
     * For checking if the argument values are unique in the user table
     * 
     * @param valuesToCheck 
     * 
     * 
     */
    public static checkUniqueness(valuesToCheck : IELitteralObject) : Promise<boolean> {

        return new Promise((resolve, reject) => {

            Database.getManager().findOne(User, valuesToCheck)
            .then((result : User | undefined) => {
                    
                resolve(result === undefined)

            })
            .catch((e) => {

                reject(e)

            })
        })
    }
    
    /**
     * For registering a new user in the database
     * 
     * @param providedData 
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