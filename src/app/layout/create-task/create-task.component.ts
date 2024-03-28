import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { CreateTaskForm, Status, User } from '../../shared/models/interfaces/task.interface';
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
import { StatusService } from '../task-board/services/status.service';

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
  statusList: Observable<Status[]>;
  priority = PRIORITY_OPTIONS;

  constructor(
    private router: Router,
    private taskDataService: TaskDataService,
    private userData: UserDataService,
    private status: StatusService,
  ) {
    this.statusList = this.getStatus();
    this.userList = this.getUsers();
    this.createCardForm = new FormGroup<CreateTaskForm>({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
      deadlineDate: new FormControl(null, [Validators.required]),
      executorId: new FormControl(null, [Validators.required]),
    });
  }

  getStatus() {
    return this.status.getStatuses();
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
