import Database from "./database";

export default abstract class Model {

    protected db = new Database()

    public save () {
        const keys = this.getOwnProperties()
        console.log(keys);  
    }

    private getOwnProperties () : string[] {
        const properties = Object.getOwnPropertyNames(this)
        .filter((item)=>item !== "db")
        .map((propertie)=>propertie.substring(1))

        return properties
    }

}