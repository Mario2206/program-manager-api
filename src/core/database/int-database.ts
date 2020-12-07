import { Connection, EntityManager, EntityTarget, Repository } from "typeorm";

export interface IDatabase {
    connect() : Promise<Connection>
    disconnect() : Promise<void>
    getManager() : EntityManager
    getConnection() : Connection
    getRepository<Entity>(entityClass : EntityTarget<Entity>) : Repository<Entity>
    clean(tableName : string) : Promise<void>
}