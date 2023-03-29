import { INewToDo } from "../entities";
import { Collections, Database, Errors } from "../enum";
import { DateHelper } from "../helpers/date.helper";
import { MongoHelper } from "./mongo.helper";

export class MongoToDoQuery {

    public static async createToDo(database: Database, searchCollection: Collections, todos: string): Promise<string | undefined> {
        try {
            const newToDo: INewToDo = {
                user_id: Date.now().toString(),
                todos: todos
            };
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.insertOne(newToDo);

            if (response) {
                return response.insertedId.toString();
            }
            return 
        }
        catch(error: any) {
            return Errors.dbError; //TODO
        }
    }

    public static async getAllToDos(database: Database, searchCollection: Collections): Promise<any[] | undefined> {
        try {
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.find({}, { projection: { _id: 0, todos: 1 } }).toArray();

            if (response) {
                console.log(response);
                return response;
            }
        }
        catch(error: any) {
            // return Errors.dbError; //TODO
        }
    }

    public static async getAllToDosByUserEmail(database: Database, searchCollection: Collections, userEmail: string): Promise<any | undefined> {
        try {
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.find(
                    { "user_email": userEmail },
                    { projection: { _id: 0, todos: 1 } }
                )
                .toArray();

            if (response) {
                console.log("getAllToDosByUserEmail received!");
                return response;
            }
        }
        catch(error: any) {
            // return Errors.dbError; //TODO
        }
    }
}
