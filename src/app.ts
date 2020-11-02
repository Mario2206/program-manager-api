import dotenv from "dotenv"
dotenv.config()

import "reflect-metadata";
import express from "express"
import bodyparser from "body-parser"
import errorHandler from "./controller/error-handler"
import core from "express"
import userRoute from "./routes/users-route"
import Database from "./database/database"

async function app () : Promise<core.Express> {

    await Database.connect()
        
    const app = express()

    app.use(bodyparser.json())

    app.use("/users", userRoute)

    app.use(errorHandler)

    app.listen(process.env.PORT, ()=> {
        console.log("Server started");
    })

    return app
}


export default app