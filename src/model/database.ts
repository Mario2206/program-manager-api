import { Pool, QueryResult } from "pg"

class Database {

    private client : Pool

    constructor() {
        this.client = new Pool()
    }

    public query(request : string, params : Array<string>) : Promise<QueryResult> {
        return this.client.query(request, params)
    }
}

export default Database