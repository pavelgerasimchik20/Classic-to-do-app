import express, { Request, Response } from 'express';
import cors from 'cors';
import { StaticEnvironment } from './core/environment.static';
import UserController from './modules/user.controller'
import ToDoController from './modules/todo.controller'
import verifyToken from './middleware/auth.middleware';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', UserController.register)

app.post('/login', UserController.login)

app.get('/get-todos', verifyToken, ToDoController.getAllToDos)

app.get('/get-todos-by-email/:email', verifyToken,ToDoController.getAllToDosByUserEmail)

app.post('/add-todo', verifyToken,ToDoController.createToDo)

app.put('/update-todo/:id', verifyToken, ToDoController.updateToDo)

app.delete('/delete-todo/:id', verifyToken,ToDoController.deleteToDo) 


app.listen(
    StaticEnvironment.port,
    StaticEnvironment.host,
    () => {
        console.log("Server runs on: ", StaticEnvironment.host + ":" + StaticEnvironment.port)
    }
);
