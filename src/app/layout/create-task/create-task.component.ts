import { Component, DoCheck } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher, MatOptionModule } from '@angular/material/core';
import { Priority, Status, User } from '../../shared/models/interfaces/task.interface';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TaskDataService } from '../task-board/services/task-data.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../task-board/services/user-data.service';
import { Observable } from 'rxjs';
import { PRIORITY_OPTIONS } from '../../shared/constants/priority.const';
interface CreateTaskForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  status: FormControl<Status | null>;
  priority: FormControl<Priority | null>;
  deadlineDate: FormControl<Date | null>;
  executorId: FormControl<string | null>;
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  imports: [
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
  standalone: true,
})
export class CreateTaskComponent {
  createCardForm: FormGroup;
  userList: Observable<User[]>;
  priority = PRIORITY_OPTIONS;

  constructor(
    private router: Router,
    private taskDataService: TaskDataService,
    private userData: UserDataService,
  ) {
    this.userList = this.getUsers();
    this.createCardForm = new FormGroup<CreateTaskForm>({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      status: new FormControl(Status.Open, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
      deadlineDate: new FormControl(null, [Validators.required]), // маску юзнуть
      executorId: new FormControl(null, [Validators.required]),
    });
  }
  getUsers() {
    return this.userData.getUsers();
  }
  createTask() {
    if (this.createCardForm.valid) {
      this.taskDataService.createTask(this.createCardForm.value).subscribe(() => {
        this.router.navigate([`/table-task`]);
      });
    } else {
      this.createCardForm.markAllAsTouched();
    }
  }
}
// ДЛЯ ОПИСАНИЯ TEXT AREA
// ПРОСТО ОБЬЕКТ С ПОЛЬЗОВАТЕЛЯМИ
// добавить маску в дату
// enum передавать в status
// Должно сохраняться в один обьект
