import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { INewToDo } from "../entities";
import { Collections, Database, Errors } from "../enum";
import { MongoToDoQuery } from "../mongo/todo.query";

class ToDoController {

    constructor() { }

    async createToDo(req: Request, res: Response, next: NextFunction) {
        console.log("createToDo - started...")
        try {
            const todos: string = req.body.value; // TODO

            if (!todos) {
                console.log("createToDo - todos is empty")
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoToDoQuery.createToDo(Database.T5Todos, Collections.Lists, todos);
            console.log("createToDo - todos created!")
            return res.status(200).json({ result });
        }
        catch (error: any){
            console.log("createToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
        }
    }

    async deleteToDo(req: Request, res: Response, next: NextFunction) {
        console.log("deleteToDo - started...")
        try {
            const deletingTodo: string = req.body._id; // TODO

            if (!deletingTodo) {
                console.log("There is no this id")
                return res.status(400).json({ errorMessage: Errors.dbError });
            }

            const result = await MongoToDoQuery.deleteToDo(Database.T5Todos, Collections.Lists, deletingTodo);
            console.log("ToDo deleted")
            return res.status(200).json(`${deletingTodo} is deleted`);
        }
        catch (error: any){
            console.log("createToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
        }
    }

    async getAllToDos(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await MongoToDoQuery.getAllToDos(Database.T5Todos, Collections.Lists);
            return res.status(200).json({result})
        }
        catch (error: any){
            console.log("createToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
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
            console.log("createToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
        }
    }
}

export default new ToDoController();
