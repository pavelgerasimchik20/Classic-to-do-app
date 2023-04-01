import express, { Request, Response } from 'express';
import cors from 'cors';
import { StaticEnvironment } from './core/environment.static';
import UserController from './modules/user.controller'
import ToDoController from './modules/todo.controller'

const app = express();

app.use(express.json());
app.use(cors());

app.post('/create-user', UserController.createUser)


app.get('/getAll', ToDoController.getAllToDos)

app.post('/getByEmail', ToDoController.getAllToDosByUserEmail)

app.post('/add', ToDoController.addToDo)

app.delete('/delete-todo', function (req: Request, res: Response) {
    res.send('Hello Team5. Here are will be delete-todo')
    console.log(new Date(), ': /delete-todo')
})  //TODO


app.listen(
    StaticEnvironment.port,
    StaticEnvironment.host,
    () => {
        console.log("Server is running on: ", StaticEnvironment.host + ":" + StaticEnvironment.port)
    }
);
