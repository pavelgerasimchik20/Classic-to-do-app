import { INewUser } from "../entities";
import { Collections, Database, Errors } from "../enum";
import { DateHelper } from "../helpers/date.helper";
import { MongoHelper } from "./mongo.helper";

export class MongoUserQuery {

    public static async createUser(database: Database, searchCollection: Collections, email: string): Promise<string | undefined> {
        try {
            const newUser: INewUser = {
                email: email,
                date_create: DateHelper.currentDate()
            };
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.insertOne(newUser);

            if (response) {
                return response.insertedId.toString();
            }
        }
        catch(error: any) {
            console.log(error);
            return Errors.dbError; //TODO
        }
    }
}
