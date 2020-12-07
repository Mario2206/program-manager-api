import { userSeed } from "../../database/seeds/user.seed";
import AuthToken from "../../src/core/authentification/auth-token";
import Database from "../../src/core/database/database";
import { User } from "../../src/model/user";

export async function authentification() : Promise<string> {
    
    try {
        
        const db = new Database()
        const authToken = new AuthToken()

        await db.connect()
        await db.getRepository(User).save(userSeed)
        const identifyUser = await db.getManager().findOneOrFail(User, {username : userSeed[0].username})
        
        authToken.setCustomPayload({id : identifyUser.id})
        const token =  authToken.generate()

        await db.disconnect()
        
        return "Bearer " + token

    } catch(e) {
        console.error(e);
        return ''
    }
    
    
    
    
}