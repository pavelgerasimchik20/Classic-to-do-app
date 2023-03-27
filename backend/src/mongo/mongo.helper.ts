import { MongoClient } from "mongodb";
import { StaticEnvironment } from "../core/environment.static";

const client = new MongoClient(StaticEnvironment.dbConnectionString, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000
  });

export class MongoHelper {

    public static async establishConnection(database: string, searchCollection: string) {
        await client.connect();
        const connection = client.db(database).collection(searchCollection);
        return connection;
    }
}
