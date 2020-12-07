import { injectable } from "inversify";
import { Connection, createConnection, EntityManager, EntityTarget, getConnection, getManager, getRepository, Repository } from "typeorm";
import { IDatabase } from "./int-database";


@injectable()
export default class Database implements IDatabase {


    public static connectName : string = process.env.NODE_ENV ?? "development"

    public  connect() : Promise<Connection> {
        return createConnection(Database.connectName)
    }

    public  disconnect() : Promise<void> {
        return getConnection(Database.connectName).close()
    }

    public  getManager() : EntityManager{
        return getManager(Database.connectName)
    }

    public  getConnection() : Connection {
        return getConnection(Database.connectName)
    }

    public  getRepository<Entity>(entityClass : EntityTarget<Entity>) : Repository<Entity> {
        return this.getConnection().getRepository(entityClass)
    }
    
    public   clean(tableName : string) : Promise<void> {
        return getConnection(Database.connectName).query(`DELETE  FROM "${tableName}" ` )
    }

}
