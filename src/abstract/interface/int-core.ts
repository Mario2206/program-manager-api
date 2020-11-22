import { IELitteralObject } from "./int-common";

export interface IAuthToken {
    value : string,
    setCustomPayload(payload : IELitteralObject) : void,
    setExpirationDate (duration : string) : void,
    generate () : void

}

const TYPES = {
    AuthToken : Symbol.for("IAuthToken")
}

export default TYPES