import { injectable } from "inversify"
import jwt from "jsonwebtoken"
import { IELitteralObject } from "../../abstract/interface/int-common"
import { IAuthToken } from "../../abstract/interface/int-core"

@injectable()
export default class AuthToken implements IAuthToken{

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
    public generate () : string {
       return jwt.sign(this._payload, this._privateKey, this._expiration)
    }

    /**
     * For checking the authorization and giving payload if the token is correct
     * 
     * @param token 
     * @param privateKey 
     * 
     * @return IELitteralObject
     */
    public  authorize (token : string ) : IELitteralObject{
        const decoded = jwt.verify(token, this._privateKey)
         if(decoded instanceof Object) {
            return {...decoded}
         } else {
             return {payload : decoded}
         }
        
    }
    

}