
import { BAD_AUTH, BAD_VALIDATION } from "../../src/constants/types-error"
import Database from "../../src/core/database/database"

import ErrorDetail from "../../src/core/error/error-detail"
import { User } from "../../src/model/user"
import UserService from "../../src/services/user-service"

import MockDatabase, { MockEntityManager } from "../utils/mock-database"


/**
 * @group user
 */
describe("User Service", () => {
        
    describe("When registering", () => {

        let db : any;
        let fakeEntityManager : any;

        beforeEach(()=> {
             fakeEntityManager = MockEntityManager.create()
             db = new MockDatabase(fakeEntityManager)
        })

        afterEach(()=> {
            db.close()
        })

        

        it("shouldn't register the new User in database if he is already exist", async () => {

            
            fakeEntityManager.findOne.resolves(new User())
            

            const data = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }
            const errors = [new ErrorDetail(BAD_VALIDATION,"Username already taken" ), new ErrorDetail(BAD_VALIDATION,"Username already taken" )]

            const user = new User()
            user.firstname = data.firstname
            user.lastname = data.lastname
            user.username = data.username
            user.mail = data.mail
            user.password = data.password
            
           
            await expect(UserService.register(data)).rejects.toEqual(expect.arrayContaining(errors))

        })

        it("should register the new User in database if  provided data is correct", async () => {

            const data = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }

            fakeEntityManager.find.resolves()
            fakeEntityManager.save.resolvesArg(0)

           
            const user =await UserService.register(data)
        

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
        }
        let user : User;
       
        let db : any;
        let fakeEntityManager : any;

        beforeEach(async ()=> {
             fakeEntityManager = MockEntityManager.create()
             fakeEntityManager.save.resolvesArg(0)
             db = new MockDatabase(fakeEntityManager)
             user = await UserService.register(commonData)
        })

        afterEach(()=> {
            db.close()
        })


        it("should return user data when the user id is correct", async  () => {
            
            fakeEntityManager.findOne.resolves(user)
            
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

        test("shouldn't return user data when the user id is uncorrect", async  () => {

            fakeEntityManager.findOne.resolves()

            const userId = {username : "incorrect username", password : user.password}
            const expectedError = new ErrorDetail( BAD_AUTH, "User id is erroned")
            
            try {
                await UserService.login(userId)
                expect(false).toBeTruthy()
            } catch(e) {                
                expect(e).toEqual(expectedError)
            }
            
        })

        test("shouldn't return user data when the password is uncorrect", async  () => {

            fakeEntityManager.findOne.resolves(user)
            
            const userId = {username : user.username, password : "uncorrectPassword"}
            const expectedError = new ErrorDetail( BAD_AUTH, "Password is uncorrect")
            
            try {
                await UserService.login(userId)
                expect(false).toBeTruthy()
            } catch(e) {
                expect(e).toEqual(expectedError)
            }
            
        })
    })

})