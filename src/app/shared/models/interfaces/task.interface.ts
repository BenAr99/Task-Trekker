export interface Task {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  deadlineDate: Date;
  executor: User;
}

export enum Status {
  Open,
  InProgress,
  Done,
}
export enum Priority {
  Low,
  Medium,
  Hard,
}
export interface User {
  id: string;
  name: string;
}

export type CreateTask = Omit<Task, 'executor'> & {
  executorId: string;
};
