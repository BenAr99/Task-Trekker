import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDataService } from '../../services/task-data.service';
import { Task, TaskColumn } from '../../../../shared/models/interfaces/task.interface';
import { TaskColumnService } from '../../services/task-column.service';
import { Dialog } from '@angular/cdk/dialog';
import { SettingModalComponent } from '../../components/setting-modal/setting-modal.component';

@Component({
  selector: 'app-table-task',
  templateUrl: './table-task.component.html',
  styleUrl: './table-task.component.scss',
})
export class TableTaskComponent implements OnInit {
  tasks!: Task[];
  taskColumnList!: TaskColumn[];
  taskToTaskColumn?: Record<string, Task[]>;
  openDialogValue = false;

  constructor(
    public dialog: Dialog,
    private taskDataService: TaskDataService,
    private taskColumnService: TaskColumnService,
  ) {}

  ngOnInit() {
    this.taskColumnService.getTaskColumn().subscribe((valueColumn) => {
      this.taskDataService.getTask().subscribe((value) => {
        this.tasks = value;
        this.taskColumnList = valueColumn;
        this.taskToTaskColumn = this.mapTaskToTaskColumn();
      });
    });
  }

  mapTaskToTaskColumn() {
    return this.taskColumnList.reduce((acc: Record<string, Task[]>, taskColumn) => {
      acc[taskColumn.id] = this.tasks.filter((task) => task.status.id === taskColumn.id);
      return acc;
    }, {});
  }

  drop(event: CdkDragDrop<Task[]>, statusColumn: TaskColumn) {
    // с статусом все ок
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

  openDialog() {
    this.dialog.open(SettingModalComponent);
  }
}
