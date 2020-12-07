import { inject, injectable } from "inversify"
import CoreTypes from "../abstract/interface/int-core"
import { IDatabase } from "../core/database/int-database"
import { IEncryptedString } from "../core/encrypt/int-encrypted-string"
import { ICustomValidation } from "../core/validation/int-custom-validation"

@injectable()
export default abstract class Service {

    protected _database : IDatabase

    protected _validator : ICustomValidation

    protected _encryptedString : IEncryptedString

    public constructor (
        @inject(CoreTypes.Database) database : IDatabase, 
        @inject(CoreTypes.CustomValidation) validator : ICustomValidation,
        @inject(CoreTypes.EncryptedString) encryptedString : IEncryptedString 
    ) {
        this._database = database
        this._validator = validator
        this._encryptedString = encryptedString
    }
}