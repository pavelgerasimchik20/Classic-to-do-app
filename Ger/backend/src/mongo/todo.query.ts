import { ObjectId } from "mongodb";
import { INewToDo } from "../entities";
import { Collections, Database, Errors } from "../enum";
import { DateHelper } from "../helpers/date.helper";
import { MongoHelper } from "./mongo.helper";

export class MongoToDoQuery {

    public static async updateToDo(database: Database, searchCollection: Collections, id: string, newToDo: INewToDo) {
        try {

            const connection = await MongoHelper.establishConnection(database, searchCollection);

            const myid: ObjectId = new ObjectId(id);

            const filter = { _id: myid };
            const updateDoc = {
            $set: {
                text: newToDo.text,
                createDate: new Date().toLocaleString()
            }
        };
            const response = await connection.updateOne(filter, updateDoc);

        }
        catch (error: any) {
            
        }
    }

    public static async createToDo(database: Database, searchCollection: Collections, newToDo: INewToDo): Promise<string | undefined> {
        try {
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.insertOne(newToDo);

            if (response) {
                return response.insertedId.toString();
            }
            return
        }
        catch (error: any) {
            return Errors.dbError;
        }
    }

    public static async getAllToDos(database: Database, searchCollection: Collections): Promise<any[] | undefined> {
        try {
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.find({}, { projection: { text: 1, email: 1 } }).toArray();

            if (response) {
                console.log(response);
                return response;
            }
        }
        catch (error: any) {
            // return Errors.dbError;
        }
    }

    public static async getToDosByEmail(database: Database, searchCollection: Collections, userEmail: string): Promise<any | undefined> {
        try {
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const response = await connection.find(
                { "email": userEmail },
                { projection: { text: 1, email: 1, createDate: 1 } }
            )
                .toArray();

            if (response) {
                console.log("getToDosByEmail received!");
                return response;
            }
        }
        catch (error: any) {
            return Errors.dbError;
        }
    }

    public static async removeToDo(database: Database, searchCollection: Collections, id: string): Promise<string | undefined> {
        try {
            const connection = await MongoHelper.establishConnection(database, searchCollection);

            const myid: ObjectId = new ObjectId(id);
            const response = await connection.deleteOne({ _id: myid });

            if (response.deletedCount === 1) {
                return `deleted ${id}`;
            }
            return Errors.noData
        }
        catch (error: any) {
            return Errors.dbError;
        }
    }
}