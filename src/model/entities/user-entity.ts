export default class UserEntity {

    private _id: number

    private _firstname : string

    private _lastname : string

    private _username : string

    private _mail : string

    private _password : string

    constructor(data : {id : number, firstname : string, lastname : string, username : string, mail : string, password : string}) {
        this._id = data.id
        this._firstname = data.firstname
        this._lastname = data.lastname
        this._username = data.username
        this._mail = data.mail
        this._password = data.password
    }

    public get id(): number {
        return this._id
    }

    public get firstname() : string {
        return this._firstname
    }

    public set firstname (firstname : string) {
        this._firstname = firstname
    }

    public get lastname () : string {
        return this._lastname
    }

    public set lastanme (lastname : string) {
        this.lastanme = lastname
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get mail(): string {
        return this._mail;
    }

    set mail(value: string) {
        this._mail = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

}
