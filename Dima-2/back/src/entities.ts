export interface IUpdatingTask {
    task_id: string,
    task: string,
}

export interface INewToDo extends IUpdatingTask {
    user_email: string,
    date_create: string
};