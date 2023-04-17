import { INewUser } from "../entities";
import { Collections, Database, Errors } from "../enum";
import generateToken from "../helpers/generateToken";
import { IUser } from "../models/user.model";
import { MongoHelper } from "./mongo.helper";
import bcrypt from "bcrypt";


export class MongoUserQuery {

    public static async register(database: Database, searchCollection: Collections, user: INewUser): Promise<string | undefined> {
        try {
            
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const existingUser = await connection.findOne({email: user.email});

            if(existingUser) {
                return `User with ${user.email} is already exist`;
            }

            const newUser: INewUser = {
                email: user.email,
                password: user.password
            };
            const response = await connection.insertOne(newUser);

            if (response) {
                return response.insertedId.toString();
            }
        }
        catch(error: any) {
            return Errors.dbError; //TODO
        }
    }

    public static async login(database: Database, searchCollection: Collections, user: INewUser): Promise<string | undefined> {
        try {
            const connection = await MongoHelper.establishConnection(database, searchCollection);
            const existingUser = await connection.findOne({email: user.email});

            if(!existingUser) {
                return `User with ${user.email} doesn't exist`;
            }

            if(await user.password === existingUser.password) {
                const token = generateToken(user.email, user.password);
                return token.toString();
            } else {
                return "password or email it not correct"
            }
        }
        catch(error: any) {
            console.log(error)
            return Errors.dbError; //TODO
        }
    }
}
