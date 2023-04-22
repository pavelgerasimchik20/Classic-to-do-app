import { Request } from "express";

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

export interface RequestWithUserId {
    request: Request,
    userId: any
};
interface Todo {
    id: string,
    name: string
};