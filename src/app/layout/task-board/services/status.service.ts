import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, timer } from 'rxjs';
import { TasksByStatusMap, Status } from '../../../shared/models/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  // за название заебать потмо
  constructor() {}
  getStatuses(): Observable<Status[]> {
    return timer(1000).pipe(
      map(() => {
        return JSON.parse(localStorage.getItem('statuses') as string) as Status[];
      }),
    );
  }
}
