import { Connection, createConnection, EntityManager, EntityTarget, getConnection, getManager, getRepository, Repository } from "typeorm";

export default class Database {


    public static connect() : Promise<Connection> {
        return createConnection()
    }

    public static getManager() : EntityManager {
        return getManager()
    }

    public static getConnection() : Connection {
        return getConnection()
    }

    public static getRepository<Entity>(entityClass : EntityTarget<Entity>) : Repository<Entity> {
        return getRepository(entityClass)
    }

}
