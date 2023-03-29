export interface INewUser {
    email: string,
    date_create: string
};
export interface INewToDo {
    user_email: string,
    todos: string,
    dateCreate: string
};
export interface IUserTodos {
    todos: Array<Todo>
};
interface Todo {
    id: string,
    name: string
};