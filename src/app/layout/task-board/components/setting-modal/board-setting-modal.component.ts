import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Priority, Task, User } from '../../../../shared/models/interfaces/task.interface';
import { TaskDataService } from '../../services/task-data.service';
import { PRIORITY_OPTIONS } from '../../../../shared/constants/priority.const';
import { UserDataService } from '../../services/user-data.service';
import { DialogRef } from '@angular/cdk/dialog';

interface SettingOptions {
  type: FormControl<string | null>;
  option: FormControl<string | null>;
}

@Component({
  selector: 'app-board-setting-modal',
  templateUrl: './board-setting-modal.component.html',
  styleUrl: './board-setting-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BoardSettingModalComponent implements OnInit, OnDestroy {
  tasks!: Task[];
  changeableTasks!: Task[];
  sortForm: FormGroup;
  filterForm: FormGroup;
  sortType?: string;
  sortOption?: string;
  filterType?: string;
  filterOption?: string | Priority; // todo Важно подумать насчет типов
  usersList!: User[];
  currentPriority = PRIORITY_OPTIONS;

  constructor(
    private taskDataService: TaskDataService,
    private users: UserDataService,
    public dialogRef: DialogRef<Task[]>,
  ) {
    this.sortForm = new FormGroup<SettingOptions>({
      type: new FormControl(null, [Validators.required]),
      option: new FormControl(null, [Validators.required]),
    });

    this.filterForm = new FormGroup<SettingOptions>({
      type: new FormControl(null, [Validators.required]),
      option: new FormControl(null, [Validators.required]),
    });

    this.users.getUsers().subscribe((value) => {
      this.usersList = value;
    });
  }

  ngOnInit() {
    this.taskDataService.getTask().subscribe((value) => {
      this.tasks = value;
    });
    // Я решил, что перед фильтрем, будет использована сортировка
    this.taskDataService.tasksBehaviorSubject.subscribe((value) => {
      this.changeableTasks = value;
    });
  }

  sort() {
    this.sortType = this.sortForm.controls['type'].value;
    this.sortOption = this.sortForm.controls['option'].value;
    if (this.sortForm.valid) {
      switch (this.sortType) {
        case 'deadline':
          this.taskDataService.tasksBehaviorSubject.next(this.sortByDeadline(this.changeableTasks));
          return this.sortByDeadline([...this.tasks]);
        case 'priority':
          this.taskDataService.tasksBehaviorSubject.next(this.sortByPriority(this.changeableTasks));
          return this.sortByPriority([...this.tasks]);
      }
    } else {
      this.sortForm.markAllAsTouched();
    }
    return [];
  }

  sortByDeadline(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      const firstTime = new Date(a.deadlineDate).getTime();
      const secondTime = new Date(b.deadlineDate).getTime();
      return this.sortOption === 'descending' ? secondTime - firstTime : firstTime - secondTime;
    });
  }

  sortByPriority(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      const firstPriority = a.priority;
      const secondPriority = b.priority;
      return this.sortOption === 'descending'
        ? secondPriority - firstPriority
        : firstPriority - secondPriority;
    });
  }

  filter() {
    this.filterType = this.filterForm.controls['type'].value;
    this.filterOption = this.filterForm.controls['option'].value;
    if (this.filterForm.valid) {
      switch (this.filterType) {
        case 'deadline':
          this.taskDataService.tasksBehaviorSubject.next(
            this.sortByDeadline(this.sortForm.valid ? this.sort() : [...this.tasks]),
          );
          break;
        case 'priority':
          this.taskDataService.tasksBehaviorSubject.next(
            this.filterByPriority(this.sortForm.valid ? this.sort() : [...this.tasks]),
          );
          return this.filterByPriority([...this.tasks]);
        case 'user':
          this.taskDataService.tasksBehaviorSubject.next(
            this.filterByUser(this.sortForm.valid ? this.sort() : [...this.tasks]),
          );
          return this.filterByUser([...this.tasks]);
      }
    } else {
      this.filterForm.markAllAsTouched();
    }
    return [];
  }

  filterByPriority(tasks: Task[]) {
    return tasks.filter((value) => value.priority === this.filterOption);
  }

  filterByUser(tasks: Task[]) {
    return tasks.filter((value) => value.executor.id === this.filterOption);
  }

  filterChange() {
    this.filterType = this.filterForm.controls['type'].value;
    this.filterOption = this.filterForm.controls['option'].value;
  }
  clearSort() {
    this.taskDataService.tasksBehaviorSubject.next([...this.tasks]);
    this.sortForm.reset();
    if (this.filterForm.valid) {
      this.filter();
    }
  }

  clearFilter() {
    this.taskDataService.tasksBehaviorSubject.next([...this.tasks]);
    this.filterForm.reset();
    if (this.sortForm.valid) {
      this.sort();
    }
  }

  ngOnDestroy() {
    this.dialogRef.close(this.changeableTasks);
  }
}
