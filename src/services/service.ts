import { inject, injectable, interfaces } from "inversify"
import CoreTypes, { ICustomValidation, IDatabase, IEncryptedString } from "../abstract/interface/int-core"

@injectable()
export default abstract class Service {

    protected _database : IDatabase

    protected _validator : ICustomValidation

    protected _encryptedString : IEncryptedString

    public constructor (
        @inject(CoreTypes.Database) database : IDatabase, 
        @inject(CoreTypes.CustomValidation) validator : ICustomValidation,
        @inject(CoreTypes.EncryptedString) encryptedString : interfaces.Newable<IEncryptedString>
    ) {
        this._database = database
        this._validator = validator
        this._encryptedString = encryptedString
    }
}