import { ObjectId } from "mongodb";
import { INewToDo } from "../entities";
import { Collections, Database, Errors } from "../enum";
import { DateHelper } from "../helpers/date.helper";
import { MongoHelper } from "./mongo.helper";

export class MongoToDoQuery {

    public static async createToDo(database: Database, searchCollection: Collections, todos: string, email: string): Promise<INewToDo | undefined | Errors> {
        try {
            const newToDo: INewToDo = {
                user_email: email,
                todos: todos
            };
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.insertOne(newToDo);

            if (response) {
                return newToDo;
            }
            return 
        }
        catch(error: any) {
            return Errors.dbError; //TODO
        }
    }

    public static async updateToDo(database: Database, searchCollection: Collections, todos: string, id: string): Promise<string | undefined> {
        try {
            const objectId = new ObjectId(id);

            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.updateOne({_id: objectId}, {$set: {todos: todos}});

            if (response.modifiedCount === 1) {
                return todos;
            } else {
                return `No document found with ID: ${id}`;
            }  
        }
        catch(error: any) {
            return Errors.dbError; //TODO
        }
    }

    public static async deleteToDo(database: Database, searchCollection: Collections, id: string): Promise<string | undefined> {
        try {
            const objectId = new ObjectId(id);

            const connection = await MongoHelper.establishConnection(database, searchCollection);

            const response = await connection.deleteOne({_id: objectId});
            if (response.deletedCount === 1) {
                return `Successfully deleted document with ID: ${id}`;
            } else {
                return `No document found with ID: ${id}`;
            }  
        }
        catch {
                return Errors.dbError; //TODO
        }
    }

    public static async getAllToDos(database: Database, searchCollection: Collections): Promise<any[] | undefined> {
        try {
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.find({}, { projection: { todos: 1, user_email: 1 } }).toArray();

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
