import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-column',
  templateUrl: './table-column.component.html',
  styleUrl: './table-column.component.scss',
})
export class TableColumnComponent {
  @Input() title?: string;
  constructor(private router: Router) {}
  addTask(): void {
    this.router.navigate(['/create-task']);
  }
}
