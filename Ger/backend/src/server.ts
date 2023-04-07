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

app.post('/getByEmail/:email', ToDoController.getToDosByEmail)

app.post('/add', ToDoController.addToDo)

app.put('/update/:id', ToDoController.updateToDo)

app.delete('/delete/:id', ToDoController.deleteToDo)


app.listen(
    StaticEnvironment.port,
    StaticEnvironment.host,
    () => {
        console.log("Server is running on: ", StaticEnvironment.host + ":" + StaticEnvironment.port)
    }
);
