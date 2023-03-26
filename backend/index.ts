import express, {Request, Response} from 'express';

const app = express()

app.get('/', function (req: Request, res: Response) {
    res.send('Hello Team5')
    console.log(new Date(), ': get "/"')
  })
  
app.listen(
    3000, 
    "localhost", 
    () => {
        console.log("Server runs on localhost:3000")
    }
);
