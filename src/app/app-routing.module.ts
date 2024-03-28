import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './layout/create-task/create-task.component';
import { TableBoardComponent } from './layout/task-board/page/table-task/table-board.component';
import { DetailCardComponent } from './layout/detail-card/detail-card.component';

const routes: Routes = [
  { path: '', redirectTo: '/table-task', pathMatch: 'full' },
  {
    path: 'create-task',
    component: CreateTaskComponent,
  },
  {
    path: 'table-task',
    component: TableBoardComponent,
  },
  {
    path: 'detail/:id',
    component: DetailCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
