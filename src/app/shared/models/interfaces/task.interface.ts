export interface Task {
  title: string;
  description: string;
  status: TaskColumn;
  priority: Priority;
  deadlineDate: Date;
  executor: User;
}

export interface TaskColumn {
  id: string;
  name: string;
}

// export enum Status {
//   Open,
//   InProgress,
//   Verification,
//   Done,
// }

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
