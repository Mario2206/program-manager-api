import UserEntity from "../../src/model/entities/user-entity"

describe("UserEntity", () => {

    describe("When it has to save its data in the database", () => {
        const data = {
            firstname : "firstname",
            lastname : "lastname",
            username : "username",
            mail : "mail@mail.com",
            password : "password"
        }
        const user = new UserEntity()
        user
        .setFirstname(data.firstname)
        .setLastanme(data.lastname)
        .setUsername(data.username)
        .setMail(data.mail)
        .setPassword(data.password)

        user.save()

    })

})