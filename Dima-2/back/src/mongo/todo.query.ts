import { INewToDo, IUpdatingTask } from "../entities";
import { Collections, Database, Errors } from "../enum";
import { MongoHelper } from "./mongo.helper";

export class MongoToDoQuery {

    public static async createToDo(database: Database, searchCollection: Collections, newTask: INewToDo): Promise<string | undefined> {
        try {
            // const newToDo: INewToDo = {
            //     user_email: newTask.user_email,
            //     task_id: newTask.task_id,
            //     task: newTask.task,
            //     date_create: newTask.date_create
            // };
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.insertOne(newTask);

            if (!response) {
                console.log("createToDo not received!");
                return undefined; //TODO 
            }

            console.log("createToDo succesfull!");
            return response.acknowledged == true ? "task was added": "task was not added" ;
        }
        catch (error: any) {
            console.log("createToDo error!");
            return Errors.dbError;
        }
    }

    public static async changeToDo(database: Database, searchCollection: Collections, updatingTask: IUpdatingTask): Promise<string | undefined> {
        try {
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.updateOne(
                    { task_id: updatingTask.task_id },
                    { $set: { task: updatingTask.task } }
                );

            if (!response) {
                console.log("changeToDo querry error!");
                return undefined; //TODO 
            }

            console.log("changeToDo succesfull!");
            return response.acknowledged == true ? "deleted" : "not found" ;
        }
        catch (error: any) {
            console.log("changeToDo error!");
            return Errors.dbError;
        }
    }

    public static async deleteToDo(database: Database, searchCollection: Collections, taskId: INewToDo): Promise<string | undefined> {
        try {
            
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.deleteOne({task_id: taskId});

            if (!response) {
                console.log("deleteToDo querry error!");
                return undefined; //TODO 
            }

            console.log("deleteToDo succesfull!");
            return response.deletedCount == 1 ? "deleted" : "not found" ;
        }
        catch (error: any) {
            console.log("deleteToDo error!");
            return Errors.dbError;
        }
    }

    public static async getAllToDosByUserEmail(database: Database, searchCollection: Collections, userEmail: string): Promise<any | undefined> {
        try {
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.find(
                { "user_email": userEmail },
                // { projection: { _id: 0, task_id: 1, task: 1, date_create: 1 } }
            )
            .sort( { "date_create": -1 } )
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
