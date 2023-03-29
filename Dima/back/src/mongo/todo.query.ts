import { INewToDo } from "../entities";
import { Collections, Database, Errors } from "../enum";
import { MongoHelper } from "./mongo.helper";

export class MongoToDoQuery {

    public static async createToDo(database: Database, searchCollection: Collections, newTask: INewToDo): Promise<string | undefined> {
        try {
            const newToDo: INewToDo = {
                user_email: newTask.user_email,
                id: newTask.id,
                task: newTask.task,
                date_create: newTask.date_create
            };
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.insertOne(newToDo);

            if (!response) {
                console.log("createToDo not received!");
                return undefined; //TODO 
            }

            console.log("createToDo succesfull!");
            return response.insertedId.toString();
        }
        catch (error: any) {
            console.log("getAllToDosByUserEmail error!");
            return Errors.dbError;
        }
    }

    public static async getAllToDosByUserEmail(database: Database, searchCollection: Collections, userEmail: string): Promise<any | undefined> {
        try {
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.find(
                { "user_email": userEmail },
                { projection: { _id: 0, task_id: 1, task: 1 } }
            )
                .toArray();

            if (!response) {
                console.log("getAllToDosByUserEmail not received!");
                return undefined; //TODO 
            }

            console.log("getAllToDosByUserEmail received!");
            return response;
        }
        catch (error: any) {
            console.log("getAllToDosByUserEmail error!");
            return Errors.dbError;
        }
    }
}
