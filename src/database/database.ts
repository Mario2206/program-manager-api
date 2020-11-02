import { Connection, createConnection, EntityManager, EntityTarget, getConnection, getManager, getRepository, Repository } from "typeorm";

export default class Database {


    public static connectName : string = process.env.NODE_ENV ?? "development"

    public static connect() : Promise<Connection> {
        return createConnection(Database.connectName)
    }

    public static disconnect() : Promise<void> {
        return getConnection(Database.connectName).close()
    }

    public static getManager() : EntityManager {
        return getManager(Database.connectName)
    }

    public static getConnection() : Connection {
        return getConnection(Database.connectName)
    }

    public static getRepository<Entity>(entityClass : EntityTarget<Entity>) : Repository<Entity> {
        return getRepository(entityClass)
    }
    
    public static  clean(tableName : string) : Promise<void> {
        return getConnection(Database.connectName).query(`TRUNCATE TABLE "${tableName}"` )
    }

}
