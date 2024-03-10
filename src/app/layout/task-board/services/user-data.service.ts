import { Injectable } from '@angular/core';
import { map, Observable, of, timer } from 'rxjs';
import { User } from '../../../shared/models/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}
  getUsers(): Observable<User[]> {
    return timer(1000).pipe(
      map(() => {
        return JSON.parse(localStorage.getItem('users') as string);
      }),
    );
  }
}
