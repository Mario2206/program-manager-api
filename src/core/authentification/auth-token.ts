import { injectable } from "inversify"
import jwt from "jsonwebtoken"
import { IELitteralObject } from "../../abstract/interface/int-common"

@injectable()
export default class AuthToken {

    public static errors = {
        CRYPT_KEY_EMPTY : "The private key shouldn't be empty"
    }

    private _token = ""
    private _payload = {}
    private _privateKey = ""
    private _expiration = {}

    constructor() {
        this._privateKey = process.env.PRIVATE_KEY_FOR_TOKEN ?? "PRIVATE_KEY"
    }
    
    /**
     * For setting custom payload
     * 
     * @param payload 
     */
    public setCustomPayload(payload : IELitteralObject) : void {
        this._payload = {...this._payload, ...payload}
        
    }

    /**
     * For setting an expiration
     * 
     * @param duration 
     */
    public setExpirationDate (duration : string) : void{
        this._expiration = {expiresIn : duration}
    }

    /**
     * For generating the token
     */
    public generate () : void {
       this._token = jwt.sign(this._payload, this._privateKey, this._expiration)
    }

    public get value () : string {
        return this._token
    }

    /**
     * For checking the authorization and giving payload if the token is correct
     * 
     * @param token 
     * @param privateKey 
     * 
     * @return IELitteralObject
     */
    public static authorize (token : string, privateKey : string) : IELitteralObject{
        const decoded = jwt.verify(token, privateKey)
         if(decoded instanceof Object) {
            return {...decoded}
         } else {
             return {payload : decoded}
         }
        
    }
    

}