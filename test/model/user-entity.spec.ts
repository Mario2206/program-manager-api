import database from "../../src/model/database"
import User from "../../src/model/entities/user"


describe("UserEntity", () => {

    const db = database
    const tableName = Object.getPrototypeOf(new User()).constructor.name.toLowerCase()
    describe("When it has to save its data in the database",  () => {

        beforeEach(function(done) {
            db.migrate.rollback()
            .then(function() {
              db.migrate.latest()
              .then(function() {
                return db.seed.run()
                .then(function() {
                  done();
                });
              });
            });
          });
        
          afterEach(function(done) {
            db.migrate.rollback()
            .then(function() {
              done();
            });
          });
        
        it("should persist the user in DB", async (done) => {
            const data = {
                firstname : "firstname",
                lastname : "lastname",
                username : "username",
                mail : "mail@mail.com",
                password : "password",
                created_at : new Date()
            }
            try {
                const user = new User()
                user
                .setFirstname(data.firstname)
                .setLastanme(data.lastname)
                .setUsername(data.username)
                .setMail(data.mail)
                .setPassword(data.password)

                await user.save()
            
                const req = await db(tableName).select("*")
                const userFoundInDb = req                

                expect(userFoundInDb).toEqual(data)
                done()
            } catch(e) {
                expect(e).toBeNull()
                done()
            }
    
        })

        

    })

})