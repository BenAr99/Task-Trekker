import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { TaskBoardModule } from './layout/task-board/task-board.module';
import { CreateTaskComponent } from './layout/create-task/create-task.component';
import { User } from './shared/models/interfaces/task.interface';
registerLocaleData(localeRu, 'ru');
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    TaskBoardModule,
    CreateTaskComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
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
    localStorage.setItem('users', JSON.stringify(users));
  }
}
