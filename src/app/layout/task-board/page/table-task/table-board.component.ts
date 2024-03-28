import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDataService } from '../../services/task-data.service';
import {
  Task,
  Status,
  TasksByStatusMap,
} from '../../../../shared/models/interfaces/task.interface';
import { StatusService } from '../../services/status.service';
import { Dialog } from '@angular/cdk/dialog';
import { BoardSettingModalComponent } from '../../components/setting-modal/board-setting-modal.component';
import { debounceTime, forkJoin, switchMap, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table-board',
  templateUrl: './table-board.component.html',
  styleUrl: './table-board.component.scss',
})
export class TableBoardComponent implements OnInit {
  changeTasks?: Task[];
  originTasks!: Task[];
  tasks!: Task[];
  taskColumnList!: Status[];
  taskToTaskColumn?: TasksByStatusMap;
  filterText: FormControl<string> = new FormControl();

  constructor(
    public dialog: Dialog,
    private taskDataService: TaskDataService,
    private statusService: StatusService,
  ) {}

  ngOnInit() {
    forkJoin({
      statuses: this.statusService.getStatuses(),
      getTask: this.taskDataService.getTask(),
    })
      .pipe(
        tap(({ statuses, getTask }) => {
          this.taskColumnList = statuses;
          this.originTasks = getTask;
          this.taskDataService.tasksBehaviorSubject.next(getTask);
        }),
        switchMap(() => {
          return this.taskDataService.tasksBehaviorSubject;
        }),
      )
      .subscribe((value) => {
        this.tasks = value;
        this.taskToTaskColumn = this.mapTaskToTaskColumn();
      });

    this.filterText.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
      this.taskDataService.tasksBehaviorSubject.next([...this.filter(value)]);
    });
  }

  mapTaskToTaskColumn(): TasksByStatusMap {
    return this.taskColumnList.reduce((acc: Record<string, Task[]>, taskColumn) => {
      acc[taskColumn.id] = this.tasks.filter((task) => task.status.id === taskColumn.id);
      return acc;
    }, {});
  }

  filter(text: string): Task[] {
    if (text.length < 1 && this.changeTasks) {
      return this.changeTasks;
    } else if (text.length < 1) {
      return this.originTasks;
    }
    console.log(this.tasks, 'не в ифе');
    return this.tasks.filter((value) => {
      return value.title.toLowerCase().includes(text.toLowerCase());
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(BoardSettingModalComponent);
    dialogRef.closed.subscribe((value) => {
      // todo выебывался в value, не давал задать явный тип, якобы он там должен ожидать any/unknown
      this.changeTasks = value as Task[];
    });
  }

  drop(event: CdkDragDrop<Task[]>, statusColumn: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.taskDataService
        .transferTask(event.container.data[event.currentIndex], statusColumn)
        .subscribe();
    }
  }
}
