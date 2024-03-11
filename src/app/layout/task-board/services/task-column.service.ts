import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { TaskColumn } from '../../../shared/models/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskColumnService {
  constructor() {}
  getTaskColumn(): Observable<TaskColumn[]> {
    return timer(1000).pipe(
      map(() => {
        return JSON.parse(localStorage.getItem('statuses') as string) as TaskColumn[];
      }),
    );
  }
}
