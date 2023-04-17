import { Request, Response, NextFunction } from "express";
import { Collections, Database, Errors } from "../enum";
import { MongoUserQuery } from "../mongo/user.query";
import { INewUser } from "../entities";

class UserController {

    constructor() { }

    async register(req: Request, res: Response, next: NextFunction) {
        console.log("createUser - started...")
        try {
            const newUser: INewUser = {
                email: req.body.email,
                password: req.body.password
            }

            if (!newUser) {
                console.log("Some fields are empty")
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoUserQuery.register(Database.T5Todos, Collections.Users, newUser);
            console.log("createUser - user created!")
            return res.status(200).json(result);
        }
        catch (error: any){
            console.log("createUser - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        console.log("login - started...")
        try {
            const newUser: INewUser = {
                email: req.body.email,
                password: req.body.password
            }

            if (!newUser) {
                console.log("Some fields are empty")
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoUserQuery.login(Database.T5Todos, Collections.Users, newUser);
            return res.status(200).json(result);
        }
        catch (error: any){
            console.log("createUser - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
        }
    }
}

export default new UserController();
