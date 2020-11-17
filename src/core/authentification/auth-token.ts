import jwt from "jsonwebtoken"
import { IELitteralObject } from "../../abstract/int-common"

export default class AuthToken {

    public static errors = {
        CRYPT_KEY_EMPTY : "The private key shouldn't be empty"
    }

    private _token = ""
    private _payload = {}
    private _privateKey = ""
    private _expiration = {}

    constructor(privateKey : string) {
        if(privateKey.length === 0) throw new Error(AuthToken.errors.CRYPT_KEY_EMPTY)
        this._privateKey = privateKey
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