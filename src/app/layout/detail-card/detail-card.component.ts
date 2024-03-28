import { Component, OnInit } from '@angular/core';
import { TaskDataService } from '../task-board/services/task-data.service';
import { filter, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Task, User } from '../../shared/models/interfaces/task.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PRIORITY_MAP } from '../../shared/constants/priority.const';
import { UserDataService } from '../task-board/services/user-data.service';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.scss',
})
export class DetailCardComponent implements OnInit {
  task?: Task;
  createCardForm!: FormGroup;
  priority = PRIORITY_MAP;
  users!: User[];

  constructor(
    private taskDataService: TaskDataService,
    private route: ActivatedRoute,
    private userDataService: UserDataService,
  ) {
    this.userDataService.getUsers().subscribe((value) => {
      this.users = value;
    });

    this.createCardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      deadlineDate: new FormControl('', [Validators.required]),
      executorId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.taskDataService
      .getTask()
      .pipe(
        map((value) => {
          return value.find((task) => task.title === this.route.snapshot.paramMap.get('id'));
        }),
        filter((task): task is Task => Boolean(task)),
      )
      .subscribe((value: Task) => {
        this.task = value;
        this.createCardForm = new FormGroup({
          title: new FormControl(this.task.title, [Validators.required]),
          description: new FormControl(this.task.description, [Validators.required]),
          status: new FormControl(this.task.status.name, [Validators.required]),
          priority: new FormControl(this.priority[this.task.priority], [Validators.required]),
          deadlineDate: new FormControl(new Date(this.task.deadlineDate), [Validators.required]), // маску юзнуть
          executorId: new FormControl(this.task.executor.id, [Validators.required]),
        });
      });
  }

  saveTask() {
    if (this.createCardForm.valid) {
      this.taskDataService.changeUserTask(this.createCardForm.value).subscribe();
    }
  }
}
