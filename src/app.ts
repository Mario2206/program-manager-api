import "reflect-metadata";
import express from "express"
import bodyparser from "body-parser"
import errorHandler from "./core/controller/error-handler"
import userRoute from "./routes/users-route"
import exerciseRoute from './routes/exercise-route'
import Database from "./core/database/database"
import { EXERCISE_ROUTE, USER_ROUTE } from "./constants/routes";
import { Server } from "http";




async function app () : Promise<Server> {

    const db = new Database()

    await db.connect()
            
    const app = express()

    app.use(bodyparser.json())
    
    app.use(USER_ROUTE, userRoute)

    app.use(EXERCISE_ROUTE, exerciseRoute)

    app.use(errorHandler)

    const server : Server = app.listen(process.env.PORT, async  () => {
        
        console.log("Server open on " + process.env.PORT);

        // resolve(server)
    
    })

    return server
   
    
}  

export default app



