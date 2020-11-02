import { IELitteralObject } from "../abstract/int-common"
import {UserSchema} from "../abstract/schema-model"
import { HTTP_BAD_REQUEST, HTTP_SERVER_ERROR } from "../constants/http"
import { BAD_IDENTIFICATION, BAD_PASS } from "../constants/messages"
import Database from "../database/database"
import {User} from "../database/entity/user"
import EncryptedString from "../entities/encrypted-string"
import ErrorService from "../entities/error-service"


export default class UserService {

    /**
     * For checking if the argument values are unique in the user table
     * 
     * @param valuesToCheck 
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
    public static register (providedData : UserSchema) : Promise<User> {
        
        const user = new User()
        
        user.lastname = providedData.lastname
        user.firstname = providedData.firstname
        user.username = providedData.username
        user.mail = providedData.mail
        user.password = providedData.password
                
        return Database.getManager().save(user)
    }

    /**
     * To check if the user id  enable to find an user  in the database
     * 
     * @param userId 
     * @param password 
     */
    public static login (userId : {username? : string, mail? : string}, password : string) : Promise<User> {
        
        return new Promise ((resolve, reject) => {

            if(!userId.username && !userId.mail) {
                reject(new ErrorService(HTTP_SERVER_ERROR, "Username or mail have to be informed"))
            }
        
            Database.getManager().findOne(User, userId)
            .then(async (user : User | undefined) => {
                console.log(user);
                
                if(!user) {
                    return reject(new ErrorService(HTTP_BAD_REQUEST, BAD_IDENTIFICATION))
                }

                const check = await EncryptedString.compare(password, user.password)
                // console.log(password, user.password);
                
                if(!check) {
                    return reject(new ErrorService(HTTP_BAD_REQUEST, BAD_PASS))
                }

                resolve(user)  

            })
        })
      
        
    }



}