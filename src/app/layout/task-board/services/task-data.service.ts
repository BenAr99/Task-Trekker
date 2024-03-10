import { Injectable } from '@angular/core';
import { CreateTask, Task, User } from '../../../shared/models/interfaces/task.interface';
import { map, Observable, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  taskData?: Task;
  constructor() {}

  createTask(newTask: CreateTask) {
    return timer(1000).pipe(
      tap(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]') as CreateTask[];
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }),
    );
  }
  getTask(): Observable<Task[]> {
    return timer(1000).pipe(
      map(() => {
        return JSON.parse(localStorage.getItem('tasks') ?? '[]') as CreateTask[];
      }),
      map((createTaskList) => {
        const users = JSON.parse(localStorage.getItem('users') as string) as User[];
        return createTaskList.map((task) => {
          const user = users.find((value) => {
            return value.id === task.executorId;
          });
          const taskOptional: Partial<CreateTask> = task;
          delete taskOptional.executorId;
          return { ...taskOptional, executor: user } as Task;
        });
      }),
    );
  }
}
