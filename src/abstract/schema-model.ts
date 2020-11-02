export type ModelEntity = {
    created_at? : Date,
    updated_at? : Date,
    id? : number
}

export type UserSchema = {
    firstname : string,
    lastname : string, 
    username : string,
    mail : string,
    password : string,
}