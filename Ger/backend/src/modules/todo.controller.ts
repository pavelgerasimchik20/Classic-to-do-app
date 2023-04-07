import { Request, Response, NextFunction } from "express";
import { INewToDo } from "../entities";
import { Collections, Database, Errors } from "../enum";
import { MongoToDoQuery } from "../mongo/todo.query";
import { ObjectId } from 'mongodb';

class ToDoController {

    constructor() { }

    async updateToDo(req: Request, res: Response, next: NextFunction) {
        console.log("updateToDo - started...")
        try {
            const id: string = req.params.id;

            const newToDo: INewToDo = {
                email: req.body.email,
                text: req.body.text
            }

            const result = await MongoToDoQuery.updateToDo(Database.T5Todos, Collections.Ger, id, newToDo);
            console.log("updateToDod - todos updated!")
            return res.status(200).json({ result });
        }
        catch (error: any) {
            console.log("createToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin });
        }
    }

    async addToDo(req: Request, res: Response, next: NextFunction) {
        console.log("createToDo - started...")
        try {
            const newToDo: INewToDo = {
                email: req.body.email,
                text: req.body.text
            };

            if (!newToDo.text) {
                console.log("text is empty")
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoToDoQuery.createToDo(Database.T5Todos, Collections.Ger, newToDo);
            console.log("add method - todos created!")
            return res.status(200).json({ result });
        }
        catch (error: any) {
            console.log("createToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin });
        }
    }

    async getAllToDos(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await MongoToDoQuery.getAllToDos(Database.T5Todos, Collections.Ger);
            return res.status(200).json({ result })
        }
        catch (error: any) {
            console.log("getAllToDos - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin });
        }
    }

    async getToDosByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const userEmail: string = req.params.email;

            const result = await MongoToDoQuery.getToDosByEmail(
                Database.T5Todos,
                Collections.Ger,
                userEmail);
            return res.status(200).json({ result })
        }
        catch (error: any) {
            console.log("getToDoByUserEmail - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin });
        }
    }

    async deleteToDo(req: Request, res: Response, next: NextFunction) {
        console.log("deleteToDo - started...")
        try {
            const id: string = req.params.id;

            if (!id) {
                console.log("id is empty")
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoToDoQuery.removeToDo(Database.T5Todos, Collections.Ger, id);
            console.log("delete method - todos deleted!")
            return res.status(200).json({ result });
        }
        catch (error: any) {
            console.log("deleteToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin });
        }
    }
}

export default new ToDoController();
