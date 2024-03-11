import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDataService } from '../../services/task-data.service';
import { TaskColumn, Task } from '../../../../shared/models/interfaces/task.interface';
import { TaskColumnService } from '../../services/task-column.service';

@Component({
  selector: 'app-table-task',
  templateUrl: './table-task.component.html',
  styleUrl: './table-task.component.scss',
})
export class TableTaskComponent implements OnInit {
  tasks!: Task[];
  InProgress: Task[] = [];
  verification: Task[] = [];
  closed: Task[] = [];
  taskColumnList!: TaskColumn[];
  taskToTaskColumn?: Task[][];
  constructor(
    public taskDataService: TaskDataService,
    private taskColumnService: TaskColumnService,
  ) {}
  ngOnInit() {
    this.taskColumnService.getTaskColumn().subscribe((valueColumn) => {
      this.taskDataService.getTask().subscribe((value) => {
        this.tasks = value;
        this.taskColumnList = valueColumn;
        this.taskToTaskColumn = this.mapTaskToTaskColumn();
        console.log(this.taskToTaskColumn);
        console.log(this.taskToTaskColumn[0]);
      });
    });
  }

  mapTaskToTaskColumn() {
    return this.taskColumnList.map((taskColumn) => {
      return this.tasks.filter((task) => {
        console.log(task);
        return task.status.id === taskColumn.id;
      });
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
