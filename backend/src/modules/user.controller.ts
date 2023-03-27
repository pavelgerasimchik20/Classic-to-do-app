import { Request, Response, NextFunction } from "express";
import { Collections, Database, Errors } from "../enum";
import { MongoUserQuery } from "../mongo/user.query";

class UserController {

    constructor() { }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userEmail: string = req.body.email; // TODO

            if (userEmail) {
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoUserQuery.createUser(Database.T5Todos, Collections.Users, userEmail);
            return res.status(200).json({ result });
        }
        catch (error: any){
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
        }
    }
}

export default new UserController();
