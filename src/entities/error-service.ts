import IEErrorService from "../abstract/entities/IErrorService"

export default class ErrorService<T = string> implements IEErrorService<T>  {

    /*
        HTTP STATUS
    */
    protected _status : number
    protected _message : T

    constructor(status : number, message : T) {
        this._status = status
        this._message = message
    }   

    public get message() : T{
        return this._message
    }

    public get status() : number {
        return this._status
    }

    public set status(status : number) {
        this._status = status
    }

}