import "reflect-metadata";
import express from "express"
import bodyparser from "body-parser"
import errorHandler from "./controller/error-handler"
import userRoute from "./routes/users-route"
import Database from "./database/database"
import { USER_ROUTE } from "./constants/routes";
import { Server } from "http";



async function app () : Promise<Server> {

    await Database.connect()

    return new Promise( (resolve)=> {
            
        const app = express()

        app.use(bodyparser.json())

        app.use(USER_ROUTE, userRoute)

        app.use(errorHandler)

        const server : Server = app.listen(process.env.PORT, () => {

            console.log("Server open on " + process.env.PORT);
            

            resolve(server)
        
        })

        return server
    })
    
}  

export default app



