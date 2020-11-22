import { Connection, EntityManager, EntityTarget, Repository } from "typeorm";
import ErrorService from "../../core/error/error-service";
import { IELitteralObject } from "./int-common";

export interface IDatabase {
    connect() : Promise<Connection>
    disconnect() : Promise<void>
    getManager() : EntityManager
    getConnection() : Connection
    getRepository<Entity>(entityClass : EntityTarget<Entity>) : Repository<Entity>
    clean(tableName : string) : Promise<void>
}

export interface ICustomValidation {
    validate(entity : Object) : Promise<ErrorService[]>
}

export interface IAuthToken {
    value : string,
    setCustomPayload(payload : IELitteralObject) : void,
    setExpirationDate (duration : string) : void,
    generate () : void

}

export interface IEncryptedString {
    value : string 
    salt : number
    encrypt() : Promise<string>
}

export interface IEncryptedStringConstructable {
    new(value : string) : IEncryptedString
}

const TYPES = {
    AuthToken : Symbol.for("IAuthToken"),
    CustomValidation : Symbol.for("CustomValidation"),
    Database : Symbol.for("IDatabase"),
    EncryptedString : Symbol.for("IEncryptedStringConstructable")
}

export default TYPES