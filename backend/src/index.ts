import express, { Request, Response } from 'express';
import { StaticEnvironment } from './core/environment.static';

const app = express()

app.get('/get-todos', function (req: Request, res: Response) {
    res.send('Hello Team5. Here are will be get-todos')
    console.log(new Date(), ': /get-todos')
})

app.post('/create-user', function (req: Request, res: Response) {
    res.send('Hello Team5. Here are will be create-user')
    console.log(new Date(), ': /create-user')
})

app.post('/add-todo', function (req: Request, res: Response) {
    res.send('Hello Team5. Here are will be add-todo')
    console.log(new Date(), ': /add-todo')
})

app.delete('/delete-todo', function (req: Request, res: Response) {
    res.send('Hello Team5. Here are will be delete-todo')
    console.log(new Date(), ': /delete-todo')
})


app.listen(
    StaticEnvironment.port,
    StaticEnvironment.host,
    () => {
        console.log("Server runs on: ", StaticEnvironment.host, ":", StaticEnvironment.port)
    }
);
