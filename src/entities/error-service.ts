import IEErrorService from "../abstract/entities/IErrorService"

export default class ErrorService implements IEErrorService  {

    /*
        HTTP STATUS
    */
    private _status : number
    private _message : string

    constructor(status : number, message : string) {
        this._status = status
        this._message = message
    }   

    public get message() : string{
        return this._message
    }

    public get status() : number {
        return this._status
    }

    public set status(status : number) {
        this._status = status
    }

}