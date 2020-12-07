export interface IEncryptedString {
    salt : number
    encrypt(value : string) : Promise<string>,
    compare(original : string, encryptedString : string) : Promise<boolean>
}