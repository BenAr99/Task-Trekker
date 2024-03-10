import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './layout/create-task/create-task.component';
import { TableTaskComponent } from './layout/task-board/page/table-task/table-task.component';

const routes: Routes = [
  {
    path: 'create-task',
    component: CreateTaskComponent,
  },
  {
    path: 'table-task',
    component: TableTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
