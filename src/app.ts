import dotenv from "dotenv"
dotenv.config()

import express from "express"
import errorHandler from "./controller/error-handler"
import core from "express"
import userRoute from "./routes/users-route"

function app () : core.Express {
        
    const app = express()

    app.use("/users", userRoute)

    app.use(errorHandler)

    app.listen(process.env.PORT, ()=> {
        console.log("Server started");
    })

    return app
}


export default app