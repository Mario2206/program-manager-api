export default interface IEErrorService {
    message : ErrorDetail | ErrorDetail[], 
    status : number
}

export interface ErrorDetail  {
    type : string, 
    errorValue : string
}