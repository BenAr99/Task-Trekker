import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDataService } from '../../services/task-data.service';
import { Task } from '../../../../shared/models/interfaces/task.interface';

@Component({
  selector: 'app-table-task',
  templateUrl: './table-task.component.html',
  styleUrl: './table-task.component.scss',
})
export class TableTaskComponent implements OnInit, AfterViewInit {
  tasks!: Task[];
  InProgress: Task[] = [];
  verification: Task[] = [];
  closed: Task[] = [];
  constructor(public taskDataService: TaskDataService) {}
  ngOnInit() {
    this.taskDataService.getTask().subscribe((value) => {
      this.tasks = value;
    });
  }

  ngAfterViewInit() {
    console.log(this.tasks);
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
