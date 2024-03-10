import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-column',
  templateUrl: './table-column.component.html',
  styleUrl: './table-column.component.scss',
})
export class TableColumnComponent {
  @Input() title?: string;
}
