export interface INewUser {
    email: string,
    password: string,
    comparePassword?(password: string): Promise<boolean>
};

export interface IRole {
    role: string
};
export interface INewToDo {
    user_email: string,
    todos: string
};
export interface IUserTodos {
    todos: Array<Todo>
};
export interface Todo {
    id: string,
    name: string
};

export interface Database {
    mongoose: any;
    user: any;
    role: any;
    ROLES: string[];
  }
  