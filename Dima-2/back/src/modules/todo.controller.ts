import { Request, Response, NextFunction } from "express";
import { Collections, Database, Errors } from "../enum";
import { MongoToDoQuery } from "../mongo/todo.query";
import { INewToDo, IUpdatingTask } from '../entities';
import middlewear from '../middlewear/token.validation'


class ToDoController {

    constructor() { }

    async createToDo(req: Request, res: Response, next: NextFunction) {
        console.log("createToDo - started...")
        try {
            const newTask: INewToDo = {
                user_email: req.body.email,
                task_id: req.body.taskToAdd.task_id,
                task: req.body.taskToAdd.task,
                date_create: req.body.taskToAdd.date_create
            }

            if (!newTask) {
                console.log("createToDo - task is empty")
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoToDoQuery.createToDo(Database.T5Todos, Collections.Dima, newTask);
            console.log("createToDo - todos created!")
            return res.status(200).json({ result });
        }
        catch (error: any) {
            console.log("createToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
        }
    }

    async changeToDo(req: Request, res: Response, next: NextFunction) {
        console.log("changeToDo - started...")
        try {
            const updatingTask: IUpdatingTask = {
                task_id: req.body.taskToUpdate.task_id,
                task: req.body.taskToUpdate.task
            }
            if (!updatingTask) {
                console.log("changeToDo - task is empty")
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoToDoQuery.changeToDo(Database.T5Todos, Collections.Dima, updatingTask);
            console.log("changeToDo - todos created!")
            return res.status(200).json({ result });
        }
        catch (error: any) {
            console.log("changeToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
        }
    }
    async deleteToDo(req: Request, res: Response, next: NextFunction) {
        console.log("deleteToDo - started...")
        try {
            const taskId: INewToDo = req.body.taskId

            if (!taskId) {
                console.log("deleteToDo - task is empty")
                return res.status(400).json({ errorMessage: Errors.noData });
            }

            const result = await MongoToDoQuery.deleteToDo(Database.T5Todos, Collections.Dima, taskId);
            console.log("deleteToDo - todos created!")
            return res.status(200).json({ result });
        }
        catch (error: any) {
            console.log("deleteToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
        }
    }

    async getAllToDo(req: Request, res: Response, next: NextFunction) {
        console.log("getAllToDo - started...")
        try {
            let userEmail: string = req.body.email;

            const result = await MongoToDoQuery.getAllToDosByUserEmail(
                Database.T5Todos,
                Collections.Dima,
                userEmail);
            console.log("getAllToDo - done")
            return res.status(200).json({ result })
        }
        catch (error: any) {
            console.log("getAllToDo - server error")
            return res.status(500).json({ errorMessage: Errors.callToAdmin }); //TODO ResponseHelper
        }
    }
}

export default new ToDoController();
