import bcrypt from "bcrypt"
import { NextFunction } from "express"

export default class CryptString {

    public static errors = {
        KEYNAME_EMPTY : "Keyname haven't to be empty",
        NO_EXISTENCE_OF_KEY : "The key passed doesn't exist in the request"
    }

    public static cryptValue(keyName : string) : middleware {
        return (req : Request, res : Response, next : NextFunction) => {
            //... crypt word
        }
    }

}