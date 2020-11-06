import { BAD_IDENTIFICATION, BAD_PASS } from "../../src/constants/messages"
import Database from "../../src/database/database"
import { User } from "../../src/database/entity/user"
import EncryptedString from "../../src/entities/encrypted-string"
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
            
           
            const req = await Database.getManager().find<User>(User, {username : data.username})
            const user = req[0]

            expect(req.length).toBe(1)
            expect(user.firstname).toBe(data.firstname)
            expect(user.lastname).toBe(data.lastname)
            expect(user.username).toBe(data.username)
            expect(user.mail).toBe(data.mail)
            expect(user.password).not.toBe("")
            expect(user.password).not.toBe(data.password)
            
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
        let user : User;

        beforeAll(async ()=> {
            await Database.connect()
        })

        beforeEach( async () => {
            const data = {...commonData}

            user = await UserService.register(data)
        })

        afterEach(async ()=> {
            await Database.clean("user")
        })

        afterAll(async ()=> {
            await Database.disconnect()
        })

        it("should return user data when the user id is correct", async  () => {
            
            const userId = {username : user.username, password : commonData.password}
            
            try {

                const userConnected  = await UserService.login(userId)
                expect(userConnected.firstname).toBe(commonData.firstname)
                expect(userConnected.lastname).toBe(commonData.lastname) 
                expect(userConnected.username).toBe(commonData.username) 
                expect(userConnected.mail).toBe(commonData.mail) 

            } catch(e) {
                expect(e).toBeNull()
            }
        })

        it("shouldn't return user data when the user id is uncorrect", async  () => {
            
            const userId = {username : "incorrect username", password : user.password}
            const expectedError = new Error( BAD_IDENTIFICATION)
            
            try {
                await UserService.login(userId)
                expect(false).toBeTruthy()
            } catch(e) {
                console.dir(e);
                
                expect(e).toEqual(expectedError)
            }
            
        })

        it("shouldn't return user data when the password is uncorrect", async  () => {
            
            const userId = {username : user.username, password : "uncorrectPassword"}
            const expectedError = new Error( UserService.errors.BAD_PASS)
            
            try {
                await UserService.login(userId)
                expect(false).toBeTruthy()
            } catch(e) {
                expect(e).toEqual(expectedError)
            }
            
        })
    })

})