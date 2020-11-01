import { QueryBuilder } from "knex";
import { IELitteralObject } from "../abstract/int-common";
import database from "./database";
import Database from "./database";

export default abstract class Model {

    protected db = database

    public save () : QueryBuilder {

        const keys = this.getOwnProperties()
        const tableName = this.getTableName()
        const data = this.generateInsertData(keys)
        
        return this.db(tableName).insert(data)
    }

    private generateInsertData (keys : string[]) : IELitteralObject {

        const dataToPersist : IELitteralObject = {}

        keys.forEach((key) => dataToPersist[key] = Object.getOwnPropertyDescriptors(this)["_"+key].value )
        
        return dataToPersist
    }

    private getOwnProperties () : string[] {
        const properties = Object.getOwnPropertyNames(this)
        .filter((item)=>item !== 'db' && item !== '_id')
        .map((propertie)=>propertie.substring(1))

        return properties
    }

    private getTableName() : string {
        return Object.getPrototypeOf(this).constructor.name.toLowerCase()
    }

}