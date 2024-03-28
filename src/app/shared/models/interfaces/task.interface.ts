import { FormControl } from '@angular/forms';

export interface Task {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  deadlineDate: Date;
  executor: User;
}

export interface Status {
  id: string;
  name: string;
}

export interface CreateTaskForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  status: FormControl<Status | null>;
  priority: FormControl<Priority | null>;
  deadlineDate: FormControl<Date | null>;
  executorId: FormControl<string | null>;
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

export type TasksByStatusMap = Record<string, Task[]>;

export type CreateTask = Omit<Task, 'executor'> & {
  executorId: string;
};
