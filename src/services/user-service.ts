import { BAD_AUTH, BAD_ID, BAD_KEYS } from "../constants/types-error"

import {UserSchema} from "../abstract/type/schema-model"
import {User} from "../model/user"
import { IUserService } from "../abstract/interface/int-service"

import ErrorDetail from "../core/error/error-detail"
import Service from "./service"
import {  injectable } from "inversify"


@injectable()
export default class UserService extends Service implements IUserService{

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
    public  async register (providedData : UserSchema) : Promise<User> {
        
        const encryptPassword = await this._encryptedString.encrypt(providedData.password)
        
        const user = new User()
        
        user.lastname = providedData.lastname
        user.firstname = providedData.firstname
        user.username = providedData.username
        user.mail = providedData.mail
        user.password = encryptPassword
        
        await this._validator.validate(user)
        
        
        return this._database.getManager().save(user)
    }

    /**
     * To check if the user id  enable to find an user  in the database
     * 
     * @param userId 
     * @param password 
     * 
     * @return Promise<User>
     */
    public login (userId : {username? : string, mail? : string, password : string}) : Promise<User> {
        
        return new Promise ((resolve, reject) => {

            if(!('username' in userId) && !('mail' in userId)) {
                reject(new ErrorDetail(BAD_KEYS, "Username or mail key missing"))
            }

            const connectId = userId.username ? {username : userId.username} : {mail : userId.mail}
                        
            this._database.getManager().findOne(User, connectId)
            .then(async (user : User | undefined) => {

                if(!user) {
                    return reject(new ErrorDetail(BAD_AUTH, "User id is erroned"))
                }
                
                
                const check = await this._encryptedString.compare(userId.password, user.password)
                
                if(!check) {
                    return reject(new ErrorDetail( BAD_AUTH,"Password is uncorrect"))
                }

                resolve(user)  

            })
        })
      
        
    }

    /**
     * For finding an user according the user id
     * 
     * @param userId 
     * 
     * @return Promise<User>
     */
    public find(userId : number) : Promise<User> {
        return new Promise((resolve, reject) => {

            this._database.getManager().findOneOrFail(User, userId)
            .then((user : User)=> {
                resolve(user)
            })
            .catch(() => {
                reject( new ErrorDetail(BAD_ID, "User id is erroned") )
            })
        })
        
    }



}