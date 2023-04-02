import { Request, Response, NextFunction } from "express";
import { Collections, Database, Errors } from "../enum";
import { MongoToDoQuery } from "../mongo/todo.query";
import { INewToDo } from '../entities';

class ToDoController {

    constructor() { }

    async createToDo(req: Request, res: Response, next: NextFunction) {
        console.log("createToDo - started...")
        try {
            const newTask: INewToDo = req.body.taskToAdd

            if (!newTask) {
                console.log("createToDo - task is empty")
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoToDoQuery.createToDo(Database.T5Todos, Collections.Dima, newTask);
            console.log("createToDo - todos created!")
            return res.status(200).json({ result });
        }
        catch (error: any){
            console.log("createToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
        }
    }

    async deleteToDo(req: Request, res: Response, next: NextFunction) {
        console.log("createToDo - started...")
        try {
            const taskId: INewToDo = req.body.taskId

            if (!taskId) {
                console.log("createToDo - task is empty")
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoToDoQuery.deleteToDo(Database.T5Todos, Collections.Dima, taskId);
            console.log("createToDo - todos created!")
            return res.status(200).json({ result });
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
                Collections.Dima,
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
