import bcrypt from "bcrypt"


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
            
            throw new Error( "String content shouldn't be empty")
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