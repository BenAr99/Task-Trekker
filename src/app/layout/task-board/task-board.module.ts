import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnComponent } from './components/table-column/table-column.component';
import { TableTaskComponent } from './page/table-task/table-task.component';
import { MatButtonModule } from '@angular/material/button';
import { TableCardComponent } from './components/table-card/table-card.component';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { PriorityColorDirective } from '../../shared/directives/priority-color.directive';
import { MatInputModule } from '@angular/material/input';
import { SettingModalComponent } from './components/setting-modal/setting-modal.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    TableColumnComponent,
    TableTaskComponent,
    TableCardComponent,
    SettingModalComponent,
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
  ],
  exports: [TableTaskComponent, TableColumnComponent],
})
export class TaskBoardModule {}
