import jwt from "jsonwebtoken"
import { IELitteralObject } from "../abstract/int-common"

export default class AuthToken {

    private _token = ""
    private _payload = {}
    private _privateKey = ""

    constructor(privateKey : string) {
        this._privateKey = privateKey
    }

    public setCustomPayload(payload : IELitteralObject) : void {
        this._payload = {...this._payload, ...payload}
        
    }

    /**
     * For generating the token
     */
    public generate () : void {
       this._token = jwt.sign(this._payload, this._privateKey)
    }

    public get value () : string {
        return this._token
    }
    

}