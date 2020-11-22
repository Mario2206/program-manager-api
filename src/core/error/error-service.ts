import IEErrorService, { ErrorDetail } from "../../abstract/interface/int-error"

export default class ErrorService implements IEErrorService  {

    /*
        HTTP STATUS
    */
    protected _status : number
    protected _message : ErrorDetail | ErrorDetail[]

    constructor(status : number, message : ErrorDetail | ErrorDetail[]) {
        this._status = status
        this._message = message
    }   

    public get message() : ErrorDetail | ErrorDetail[]{
        return this._message
    }

    public get status() : number {
        return this._status
    }

    public set status(status : number) {
        this._status = status
    }

}