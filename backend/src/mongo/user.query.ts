import { Collections, Database } from "../enum";
import { DateHelper } from "../helpers/date.helper";
import { MongoHelper } from "./mongo.helper";

export class MongoUserQuery {

    public static async createUser(database: Database, searchCollection: Collections, email: string): Promise<string | undefined> {
        try {
            const insertedUser = {
                email: email,
                dateCreate: DateHelper.currentDate()
            };
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.insertOne(insertedUser);

            if (response) {
                return response.insertedId.toString();
            }
        }
        finally {
            // TODO
        }
    }
}
