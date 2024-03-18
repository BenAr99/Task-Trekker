import { Injectable } from '@angular/core';
import {
  CreateTask,
  Task,
  TaskColumn,
  User,
} from '../../../shared/models/interfaces/task.interface';
import { map, Observable, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  transferTask(task: Task, column: TaskColumn) {
    // почему я должен ставить таймер, когда имитирую отправку на бэк? Не должен же?
    return timer(1000).pipe(
      tap(() => {
        console.log(task, 'в начале приходит ли карта');
        const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]') as CreateTask[];
        tasks.find((value, index) => {
          if (
            value.title === task.title &&
            value.description === task.description &&
            value.status.id === task.status.id
          ) {
            tasks[index].status.id = column.id;
          }
        });
        console.log('я тут');
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }),
    );
  }

  createTask(newTask: CreateTask) {
    // почему я должен ставить таймер, когда имитирую отправку на бэк? Не должен же?
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
        // поправильному users брать с user-data.service
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

  // filterTask(task) {}
}
