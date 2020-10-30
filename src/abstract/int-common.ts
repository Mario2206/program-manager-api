export interface IELitteralObject {
    [key : string] : string | number | boolean | Array<unknown> |  IELitteralObject 
}