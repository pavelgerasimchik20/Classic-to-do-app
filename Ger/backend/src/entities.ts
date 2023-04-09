export interface INewUser {
    email: string,
    date_create: string
};
export interface INewToDo {
    email: string,
    text: string,
    createDate: string
};
export interface IUserTodos {
    todos: Array<Todo>
};
interface Todo {
    id: string,
    name: string
};