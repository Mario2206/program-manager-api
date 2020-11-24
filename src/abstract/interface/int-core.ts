import { Connection, EntityManager, EntityTarget, Repository } from "typeorm";
import ErrorService from "../../core/error/error-service";
import { middleware } from "../type/type-middleware";
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
    setCustomPayload(payload : IELitteralObject) : void,
    setExpirationDate (duration : string) : void,
    generate () : string,
    authorize (incomingToken : string) : IELitteralObject

}

export interface IEncryptedString {
    salt : number
    encrypt(value : string) : Promise<string>,
    compare(original : string, encryptedString : string) : Promise<boolean>
}

export interface IImgUploader {
    upload (dir : string, fieldName : string) : middleware
}

const TYPES = {
    AuthToken : Symbol.for("IAuthToken"),
    CustomValidation : Symbol.for("CustomValidation"),
    Database : Symbol.for("IDatabase"),
    EncryptedString : Symbol.for("IEncryptedString"),
    ImgUploader : Symbol.for("IImgUploader")
}

export default TYPES