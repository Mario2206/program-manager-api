import bcrypt from "bcrypt"
import { HTTP_SERVER_ERROR } from "../constants/http"
import ErrorService from "./error-service"

export default class EncryptedString {
    
    private _content : string 

    private _salt = 10

    constructor(text : string) {
        this._content = text
    }

    public get value () : string {
        return this._content
    }

    public set salt (salt : number) {
        this._salt = salt
    }

    /**
     * Encrypt data 
     */
    public encrypt () : Promise<string> {

        if(!this._content){ 
            console.log("error");
            
            throw new ErrorService(HTTP_SERVER_ERROR, "String content shouldn't be empty")
        }

        return new Promise((resolve, reject)=> {

            bcrypt.hash(this._content, this._salt)

            .then((hash : string) => {
                this._content = hash
                resolve()
            })
            .catch((e) => reject(e))

        })
    }

    /**
     * For comparing an encrypt data with a no encrypt data
     * 
     * @param original 
     * @param encryptedString 
     */
    public static compare(original : string, encryptedString : string) : Promise<boolean> {
        return bcrypt.compare(original, encryptedString)
    }

}