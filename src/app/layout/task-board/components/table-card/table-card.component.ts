import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../../shared/models/interfaces/task.interface';
import { PRIORITY_MAP } from '../../../../shared/constants/priority.const';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.scss',
})
export class TableCardComponent implements OnInit {
  @Input() task?: Task;
  priorityMap = PRIORITY_MAP;

  ngOnInit() {
    console.log(this.task?.executor?.name.split('')[0]);
    console.log(this.task);
  }

  constructor() {}
}
