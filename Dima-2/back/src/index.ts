import express from 'express';
import cors from 'cors';
import { StaticEnvironment } from './core/environment.static';
import ToDoController from './modules/todo.controller'
import middlewear from './middlewear/token.validation'

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.post('/check-auth', middlewear.checkToken)
app.post('/get-todos', middlewear.verifyToken, ToDoController.getAllToDo)
app.post('/add-todo', middlewear.verifyToken, ToDoController.createToDo)
app.post('/change-todo', middlewear.verifyToken, ToDoController.changeToDo)
app.post('/delete-todo', middlewear.verifyToken, ToDoController.deleteToDo)

app.listen(
    StaticEnvironment.port,
    StaticEnvironment.host,
    () => {
        console.log("Server runs on: ", StaticEnvironment.host + ":" + StaticEnvironment.port)
    }
);
