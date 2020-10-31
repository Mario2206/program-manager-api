import Model from "../model"

export default class UserEntity extends Model{

    private _id: number | null

    private _firstname : string

    private _lastname : string

    private _username : string

    private _mail : string

    private _password : string

    constructor(data = {id : null, firstname : "", lastname : "", username : "", mail : "", password : ""}) {
        super()
        this._id = data.id 
        this._firstname = data.firstname 
        this._lastname = data.lastname
        this._username = data.username
        this._mail = data.mail
        this._password = data.password
    }

    public get id(): number | null {
        return this._id
    }

    public get firstname() : string {
        return this._firstname
    }

    public setFirstname (firstname : string) : UserEntity{
        this._firstname = firstname
        return this
    }

    public get lastname () : string {
        return this._lastname
    }

    public setLastanme (lastname : string) : UserEntity{
        this._lastname = lastname
        return this
    }

    public get username(): string {
        return this._username;
    }

    public setUsername(value: string) : UserEntity{
        this._username = value;
        return this
    }

    public get mail(): string {
        return this._mail;
    }

    public setMail(value: string) : UserEntity{
        this._mail = value;
        return this
    }

    public get password(): string {
        return this._password;
    }

    public setPassword(value: string) : UserEntity{
        this._password = value;
        return this
    }

}
