import express from 'express';
import cors from 'cors';
import { StaticEnvironment } from './core/environment.static';
import ToDoController from './controllers/todo.controller'
import dbConfig from './config/db.config';
const jwt = require('jsonwebtoken');

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
  };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect('mongodb+srv://team5:xEDgUefADavknJVj@team5-todos.kolokhe.mongodb.net/T5-ToDos?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err: any) => {
    console.error("Connection error", err);
    process.exit();
  });

  async function initial() {
    try {
      const count = await Role.estimatedDocumentCount();
      if (count === 0) {
        await Promise.all([
          new Role({ name: "user" }).save(),
          new Role({ name: "moderator" }).save(),
          new Role({ name: "admin" }).save(),
        ]);
      }
    } catch (err) {
      console.error("Error during initialization", err);
      process.exit(1);
    }
  }


  // simple route for a test
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application" });
  });

//app.post('/create-user', UserController.createUser)

app.get('/getAll', ToDoController.getAllToDos)

app.post('/getByEmail/:email', ToDoController.getToDosByEmail);

app.post('/add', ToDoController.addToDo)

app.put('/update/:id', ToDoController.updateToDo)

app.delete('/delete/:id', ToDoController.deleteToDo)

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(
    StaticEnvironment.port,
    StaticEnvironment.host,
    () => {
        console.log("Server is running on: ", StaticEnvironment.host + ":" + StaticEnvironment.port)
    }
);
