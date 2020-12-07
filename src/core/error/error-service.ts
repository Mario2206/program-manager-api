import IEErrorService, { IErrorDetail } from "./int-error"

export default class ErrorService implements IEErrorService  {

    /*
        HTTP STATUS
    */
    protected _status : number
    protected _message : IErrorDetail | IErrorDetail[]

    constructor(status : number, message : IErrorDetail | IErrorDetail[]) {
        this._status = status
        this._message = message
    }   

    public get message() : IErrorDetail | IErrorDetail[]{
        return this._message
    }

    public get status() : number {
        return this._status
    }

    public set status(status : number) {
        this._status = status
    }

}