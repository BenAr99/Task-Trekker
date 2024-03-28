import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { CreateTaskComponent } from './layout/create-task/create-task.component';
import { Status, User } from './shared/models/interfaces/task.interface';
import { TaskBoardModule } from './layout/task-board/task-board.module';
import { DetailCardComponent } from './layout/detail-card/detail-card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeRu, 'ru');
@NgModule({
  declarations: [AppComponent, DetailCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TaskBoardModule,
    MatButtonModule,
    CreateTaskComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
  // имитация бэка
  constructor() {
    const statuses: Status[] = [
      {
        name: 'Открыты',
        id: 'ac9b1d4b-fcab-400b-9f52-e81ffa8eaf4f',
      },
      {
        name: 'В процессе',
        id: '4ea459cc-0adc-4207-91f3-cbdaa0c28fdf',
      },
      {
        name: 'Проверка',
        id: '516a0716-023b-4956-a23b-39c32440477e',
      },
      {
        name: 'Закрыта',
        id: '43be1706-2b0e-4e5f-b9ab-5967a78f3bd0',
      },
    ];
    const users: User[] = [
      {
        name: 'Дезмонд',
        id: '0',
      },
      {
        name: 'Геральд',
        id: '1',
      },
      {
        name: 'Валли',
        id: '2',
      },
    ];
    localStorage.setItem('statuses', JSON.stringify(statuses));
    localStorage.setItem('users', JSON.stringify(users));
  }
}
