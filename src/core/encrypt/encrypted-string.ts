import bcrypt from "bcrypt"
import { injectable } from "inversify"
import { IEncryptedString } from "../../abstract/interface/int-core"

@injectable()
export default class EncryptedString implements IEncryptedString{
    

    private _salt = 10

    public set salt (salt : number) {
        this._salt = salt
    }

    /**
     * Encrypt data 
     */
    public encrypt (value : string) : Promise<string> {
        return bcrypt.hash(value, this._salt);
    }

    /**
     * For comparing an encrypt data with a no encrypt data
     * 
     * @param original 
     * @param encryptedString 
     */
    public  compare(original : string, encryptedString : string) : Promise<boolean> {
        return bcrypt.compare(original, encryptedString)
    }

}