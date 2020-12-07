export default interface IEErrorService {
    message : IErrorDetail | IErrorDetail[], 
    status : number
}

export interface IErrorDetail  {
    type : string, 
    errorValue : string
}