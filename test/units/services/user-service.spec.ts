
import Sinon, { SinonSandbox } from "sinon"
import { EntityManager } from "typeorm"
import { ICustomValidation, IDatabase, IEncryptedString } from "../../../src/abstract/interface/int-core"
import { BAD_AUTH, BAD_VALIDATION } from "../../../src/constants/types-error"
import EncryptedString from "../../../src/core/encrypt/encrypted-string"
import ErrorDetail from "../../../src/core/error/error-detail"
import CustomValidation from "../../../src/core/validation/custom-validation"
import { User } from "../../../src/model/user"
import UserService from "../../../src/services/user-service"

import MockDatabase, { MockEntityManager } from "../../utils/mock-database"


/**
 * @group user
 */
describe("User Service", () => {
        
    describe("When registering", () => {

        let mockDb : IDatabase;
        let sandbox : SinonSandbox;
        let fakeEntityManager : Sinon.SinonStubbedInstance<EntityManager>;
        let validator : Sinon.SinonStubbedInstance<ICustomValidation>;
        let encryptedString : IEncryptedString;

        beforeEach(()=> {
            fakeEntityManager = MockEntityManager.create()
            const [db, box] = MockDatabase.create(fakeEntityManager)
            mockDb = db 
            sandbox = box
            validator = sandbox.createStubInstance(CustomValidation)
            encryptedString =sandbox.createStubInstance(EncryptedString)
       })

       afterEach(()=> {
           sandbox.restore()
       })

        

        it("shouldn't register the new User in database if he already exists", async () => {

            const data = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail@mail.com",
                password : "superPassword"
            }
            const errors = [new ErrorDetail(BAD_VALIDATION,"Username already taken" ), new ErrorDetail(BAD_VALIDATION,"Username already taken" )]

            validator.validate.rejects(errors)
            const userService = new UserService(mockDb, validator, encryptedString)
            

            const user = new User()
            user.firstname = data.firstname
            user.lastname = data.lastname
            user.username = data.username
            user.mail = data.mail
            user.password = data.password
            
           
            await expect(userService.register(data)).rejects.toEqual(expect.arrayContaining(errors))

        })

        it("shouldn't register the new User in database if some data are uncorrect", async () => {

            const data = {
                firstname : "Mario",
                lastname : "Mars",
                username : "Mirtille78",
                mail : "mail",
                password : "superPassword"
            }
            const errors = [new ErrorDetail(BAD_VALIDATION,"IncorrectMail" )]

            validator.validate.rejects(errors)
            const userService = new UserService(mockDb, validator, encryptedString)
            

            const user = new User()
            user.firstname = data.firstname
            user.lastname = data.lastname
            user.username = data.username
            user.mail = data.mail
            user.password = data.password
            
           
            await expect(userService.register(data)).rejects.toEqual(expect.arrayContaining(errors))

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

            const userService = new UserService(mockDb, validator, encryptedString)

            const user =await userService.register(data)
        

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
       
        let mockDb : IDatabase;
        let sandbox : SinonSandbox;
        let fakeEntityManager : Sinon.SinonStubbedInstance<EntityManager>;
        let validator : Sinon.SinonStubbedInstance<ICustomValidation>;
        let encryptedString : Sinon.SinonStubbedInstance<IEncryptedString>;

        beforeEach(()=> {
            fakeEntityManager = MockEntityManager.create()
            const [db, box] = MockDatabase.create(fakeEntityManager)
            mockDb = db 
            sandbox = box
            validator = sandbox.createStubInstance(CustomValidation)
            encryptedString =sandbox.createStubInstance(EncryptedString)
       })

       afterEach(()=> {
           sandbox.restore()
       })


        it("should return user data when the user id is correct", async  () => {

            const expectedUser = new User()
            expectedUser.firstname = commonData.firstname
            expectedUser.lastname = commonData.lastname
            expectedUser.username = commonData.username
            expectedUser.mail = commonData.mail

            fakeEntityManager.findOne.resolves(expectedUser)
            encryptedString.compare.resolves(true)
            const userService = new UserService(mockDb, validator, encryptedString)

            const userId = {username : commonData.username, password : commonData.password}
            
            try {
                
                const userConnected  = await userService.login(userId)
                expect(userConnected.firstname).toBe(expectedUser.firstname)
                expect(userConnected.lastname).toBe(expectedUser.lastname) 
                expect(userConnected.username).toBe(expectedUser.username) 
                expect(userConnected.mail).toBe(expectedUser.mail) 

            } catch(e) {
                expect(e).toBeNull()
            }
        })

        test("shouldn't return user data when the user id is uncorrect", async  () => {

            const userId = {username : "incorrect username", password : commonData.password}
            const expectedError = new ErrorDetail( BAD_AUTH, "User id is erroned")

            fakeEntityManager.findOne.resolves()
            const userService = new UserService(mockDb, validator, encryptedString)
            
          
            await expect(userService.login(userId)).rejects.toEqual(expectedError)
           
            
        })

        test("shouldn't return user data when the password is uncorrect", async  () => {

            const userId = {username : commonData.username, password : "uncorrectPassword"}
            const expectedError = new ErrorDetail( BAD_AUTH, "Password is uncorrect")

            encryptedString.compare.resolves()
            fakeEntityManager.findOne.resolves(new User())
            const userService = new UserService(mockDb, validator, encryptedString)
            
            
            
            await expect(userService.login(userId)).rejects.toEqual(expectedError)
            
        })
    })

})