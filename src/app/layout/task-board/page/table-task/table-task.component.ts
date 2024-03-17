import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDataService } from '../../services/task-data.service';
import { Task, TaskColumn } from '../../../../shared/models/interfaces/task.interface';
import { TaskColumnService } from '../../services/task-column.service';

@Component({
  selector: 'app-table-task',
  templateUrl: './table-task.component.html',
  styleUrl: './table-task.component.scss',
})
export class TableTaskComponent implements OnInit {
  tasks!: Task[];
  taskColumnList!: TaskColumn[];
  taskToTaskColumn?: Record<string, Task[]>;
  constructor(
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

  drop(event: CdkDragDrop<Task[]>, status: TaskColumn) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.taskDataService
        .transferTask(event.previousContainer.data[event.currentIndex], status)
        .subscribe();
      // нет смысла в таск колумн отдавать, потому что он каждый раз генерируется, с той же логикой
      // и нет смысла отслеживать его индекс, хотя этот индекс показывает статус..
      // возможно стоит поменять ид статуса у самой карточки и ебаться не придется

      // console.log(status, 'statusId');
      // console.log(event.previousContainer.data, 'hyeta');
      // console.log(event.container.data, 'data');
      // console.log(event.previousIndex, 'index');
      // console.log(event.currentIndex, 'CurrentIndex');
      // console.log('test');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  protected readonly Object = Object;
}
