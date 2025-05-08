import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent} from "./admin-dashboard/components/wrapper/admin-dashboard.component";
import {TaskComponent} from "./admin-dashboard/components/task/task.component";
import {TaskAssignedComponent} from "./admin-dashboard/components/task-assigned/task-assigned.component";
import {CreateTaskComponent} from "./admin-dashboard/components/create-task/create-task.component";
import {CategoriesComponent} from "./admin-dashboard/components/categories/categories.component";
import {UsersComponent} from "./admin-dashboard/components/users/users.component";
import {TaskDetailsComponent} from "./admin-dashboard/components/task-details/task-details.component";
import {ReportsComponent} from "./admin-dashboard/components/reports/reports.component";
import {AuthGuard} from "../../../core/guards/auth.guard";
import {AdminGuard} from "../../../core/guards/admin.guard";
import {UserGuard} from "../../../core/guards/user.guard";
import {CreateCategoriesComponent} from "./admin-dashboard/components/create-categories/create-categories.component";
import {TaskUpdateComponent} from "./admin-dashboard/components/task-update/task-update.component";

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [

      {
        path: 'tasks',
        component: TaskComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'task/assigned',
        component: TaskAssignedComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'tasks/create',
        component: CreateTaskComponent,
        canActivate: [AuthGuard, AdminGuard]
      },

      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard, AdminGuard]
      },

      {
        path: 'categories/create',
        component: CreateCategoriesComponent,
        canActivate: [AuthGuard, AdminGuard]
      },

      {
        path: 'logging',
        component: UsersComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'tasks/:id',
        component: TaskDetailsComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'report',
        component: ReportsComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'task/update/:id',
        component: TaskUpdateComponent,
        canActivate: [AuthGuard, AdminGuard]
      },

      {
        path: '',
        redirectTo: '/dashboard/report',
        pathMatch: "full"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
