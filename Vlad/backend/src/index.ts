import express, { Request, Response } from 'express';
import cors from 'cors';
import { StaticEnvironment } from './core/environment.static';
import UserController from './modules/user.controller'
import ToDoController from './modules/todo.controller'

const app = express();

app.use(express.json());
app.use(cors());

app.post('/create-user', UserController.createUser)


app.get('/get-todos', ToDoController.getAllToDos)

app.post('/get-todos-byemail', ToDoController.getAllToDosByUserEmail)

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
