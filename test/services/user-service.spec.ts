import { HTTP_BAD_REQUEST } from "../../src/constants/http"
import { BAD_IDENTIFICATION, BAD_PASS } from "../../src/constants/messages"
import Database from "../../src/database/database"
import { User } from "../../src/database/entity/user"
import EncryptedString from "../../src/entities/encrypted-string"
import ErrorService from "../../src/entities/error-service"
import UserService from "../../src/services/user-service"

describe("User Service", () => {

    describe ("When checking uniqueness", () => {
        
        beforeAll(async ()=> {
            await Database.connect()
        })

        afterEach(async ()=> {
            await Database.clean("user")
        })

        afterAll(async ()=> {
            await Database.disconnect()
        })

        it("should return false when the key value already exist in the table", async () => {

            const data = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }

            const user = new User()
            user.firstname = data.firstname
            user.lastname = data.lastname
            user.username = data.username
            user.mail = data.mail
            user.password = data.password

            
            await Database.getManager().save(user)
            const test = await UserService.checkUniqueness({mail : data.mail})

            expect(test).toBeFalsy()

        })

        it("should return true when the key value doesn't exist in the table", async () => {

            const data = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }

            const test = await UserService.checkUniqueness({mail : data.mail})

            expect(test).toBeTruthy()

        })

    })
    describe("When registering", () => {

        beforeAll(async ()=> {
            await Database.connect()
        })

        afterEach(async ()=> {
            await Database.clean("user")
        })

        afterAll(async ()=> {
            await Database.disconnect()
        })

        

        it("should register the new User in database if  provided data is correct", async () => {
            const data = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }

            await UserService.register(data)
            const req = await Database.getManager().find<User>(User, data)
            const user = req[0]

            expect(req.length).toBe(1)
            expect(user.firstname).toBe(data.firstname)
            expect(user.lastname).toBe(data.lastname)
            expect(user.username).toBe(data.username)
            expect(user.mail).toBe(data.mail)
            expect(user.password).toBe(data.password)
            
        })

    })

    describe("when logging in", () => {

        const commonData = {
            firstname : "Mario",
            lastname : "Mars",
            username : "Mirtille78",
            mail : "mail@mail.com",
            password : "superPassword",
            encryptPassword : ""
        }

        beforeAll(async ()=> {
            await Database.connect()
        })

        beforeEach( async () => {
            const data = {...commonData}
            const encrypt  = new EncryptedString(data.password)
            
            await encrypt.encrypt()
            data.password = encrypt.value

            await UserService.register(data)
        })

        afterEach(async ()=> {
            await Database.clean("user")
        })

        afterAll(async ()=> {
            await Database.disconnect()
        })

        it("should return user data when the user id is correct", async  () => {
            const data = commonData
            const userId = {username : data.username}
            const password = data.password
            try {

                const user  = await UserService.login(userId, password)
                expect(user.firstname).toBe(data.firstname)
                expect(user.lastname).toBe(data.lastname) 
                expect(user.username).toBe(data.username) 
                expect(user.mail).toBe(data.mail) 

            } catch(e) {
                expect(e).toBeNull()
            }
        })

        it("shouldn't return user data when the user id is uncorrect", async  () => {
            const data = commonData
            const userId = {username : "incorrect username"}
            const password = data.password
            const expectedError = new ErrorService(HTTP_BAD_REQUEST, BAD_IDENTIFICATION)
            
            try {
                await UserService.login(userId, password)
                expect(false).toBeTruthy()
            } catch(e) {
                expect(e).toEqual(expectedError)
            }
            
        })

        it("shouldn't return user data when the password is uncorrect", async  () => {
            const data = commonData
            const userId = {username : data.username}
            const password = "uncorrectPassword"
            const expectedError = new ErrorService(HTTP_BAD_REQUEST, BAD_PASS)
            
            try {
                await UserService.login(userId, password)
                expect(false).toBeTruthy()
            } catch(e) {
                expect(e).toEqual(expectedError)
            }
            
        })
    })

})