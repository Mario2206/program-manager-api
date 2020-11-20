export default class ErrorDetail implements ErrorDetail {

    public errorValue = ""

    public type = ""

    public constructor (type : string, errorValue : string) {
        this.type = type 
        this.errorValue = errorValue
    }


}