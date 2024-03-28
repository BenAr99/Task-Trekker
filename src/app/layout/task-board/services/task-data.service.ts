import { Injectable } from '@angular/core';
import { CreateTask, Task, User } from '../../../shared/models/interfaces/task.interface';
import { BehaviorSubject, map, Observable, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  tasksBehaviorSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  transferTask(task: Task, columnId: string) {
    return timer(1000).pipe(
      tap((): void => {
        const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]') as CreateTask[];
        tasks.find((value, index) => {
          if (
            value.title === task.title &&
            value.description === task.description &&
            value.status.id === task.status.id
          ) {
            tasks[index].status.id = columnId;
          }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }),
    );
  }

  changeUserTask(task: CreateTask) {
    return timer(1000).pipe(
      tap((): void => {
        const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]') as CreateTask[];
        tasks.find((value, index) => {
          if (value.title === task.title && value.description === task.description) {
            tasks[index].executorId = task.executorId;
          }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }),
    );
  }

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
