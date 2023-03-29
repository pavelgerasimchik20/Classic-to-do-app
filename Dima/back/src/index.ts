import express, { Request, Response } from 'express';
import cors from 'cors';
import { StaticEnvironment } from './core/environment.static';
import ToDoController from './modules/todo.controller'

const app = express();

app.use(express.json());
app.use(cors());

app.post('/get-todos', ToDoController.getAllToDosByUserEmail)
app.post('/add-todo', ToDoController.createToDo)
app.delete('/delete-todo', function (req: Request, res: Response) {
    res.send('Hello Team5. Here are will be delete-todo')
    console.log(new Date(), ': /delete-todo')
})  //TODO

app.listen(
    StaticEnvironment.port,
    StaticEnvironment.host,
    () => {
        console.log("Server runs on: ", StaticEnvironment.host + ":" + StaticEnvironment.port)
    }
);
