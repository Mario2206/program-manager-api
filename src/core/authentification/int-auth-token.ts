import { IELitteralObject } from "../../abstract/interface/int-common";

export interface IAuthToken {
    setCustomPayload(payload : IELitteralObject) : void,
    setExpirationDate (duration : string) : void,
    generate () : string,
    authorize (incomingToken : string) : IELitteralObject

}