import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnComponent } from './components/table-column/table-column.component';
import { TableBoardComponent } from './page/table-task/table-board.component';
import { MatButtonModule } from '@angular/material/button';
import { TableCardComponent } from './components/table-card/table-card.component';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { PriorityColorDirective } from '../../shared/directives/priority-color.directive';
import { MatInputModule } from '@angular/material/input';
import { BoardSettingModalComponent } from './components/setting-modal/board-setting-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    TableColumnComponent,
    TableBoardComponent,
    TableCardComponent,
    BoardSettingModalComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    MatIconModule,
    PriorityColorDirective,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FormsModule,
  ],
  exports: [TableBoardComponent, TableColumnComponent],
})
export class TaskBoardModule {}
