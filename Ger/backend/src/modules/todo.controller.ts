import { Request, Response, NextFunction } from "express";
import { INewToDo } from "../entities";
import { Collections, Database, Errors } from "../enum";
import { MongoToDoQuery } from "../mongo/todo.query";

class ToDoController {

    constructor() { }

    async createToDo(req: Request, res: Response, next: NextFunction) {
        console.log("createToDo - started...")
        try {
            const todos: string = req.body.todos; // TODO

            if (!todos) {
                console.log("todos is empty")
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoToDoQuery.createToDo(Database.T5Todos, Collections.Ger, todos);
            console.log("createToDo - todos created!")
            return res.status(200).json({ result });
        }
        catch (error: any){
            console.log("createToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); 
        }
    }

    async getAllToDos(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await MongoToDoQuery.getAllToDos(Database.T5Todos, Collections.Ger);
            return res.status(200).json({result})
        }
        catch (error: any){
            console.log("getAllToDos - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); 
        }
    }

    async getAllToDosByUserEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const userEmail: string = req.body.email;

            const result = await MongoToDoQuery.getAllToDosByUserEmail(
                Database.T5Todos, 
                Collections.Lists,
                userEmail);
            return res.status(200).json({result})
        }
        catch (error: any){
            console.log("getAllToDosByUserEmail - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin });
        }
    }
}

export default new ToDoController();
