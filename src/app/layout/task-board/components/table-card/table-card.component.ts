import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../../shared/models/interfaces/task.interface';
import { PRIORITY_MAP } from '../../../../shared/constants/priority.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.scss',
})
export class TableCardComponent {
  @Input() task?: Task;
  priorityMap = PRIORITY_MAP;

  constructor(private router: Router) {}
  detailTask() {
    this.router.navigate([`detail/${this.task?.title}`]);
  }
}
