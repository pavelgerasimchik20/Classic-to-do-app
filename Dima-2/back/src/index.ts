import express, { Request, Response } from 'express';
import cors from 'cors';
import { StaticEnvironment } from './core/environment.static';
import ToDoController from './modules/todo.controller'

const app = express();

app.use(express.json());
app.use(cors());

app.post('/get-todos', ToDoController.getAllToDosByUserEmail)
app.post('/add-todo', ToDoController.createToDo)
app.post('/change-todo', ToDoController.changeToDo)
app.post('/delete-todo', ToDoController.deleteToDo)

app.listen(
    StaticEnvironment.port,
    StaticEnvironment.host,
    () => {
        console.log("Server runs on: ", StaticEnvironment.host + ":" + StaticEnvironment.port)
    }
);
