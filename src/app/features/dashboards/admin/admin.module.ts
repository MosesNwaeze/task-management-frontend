import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminDashboardComponent} from './admin-dashboard/components/wrapper/admin-dashboard.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {TaskComponent} from './admin-dashboard/components/task/task.component';
import {TaskAssignedComponent} from './admin-dashboard/components/task-assigned/task-assigned.component';
import {CreateTaskComponent} from './admin-dashboard/components/create-task/create-task.component';
import {CategoriesComponent} from './admin-dashboard/components/categories/categories.component';
import {UsersComponent} from './admin-dashboard/components/users/users.component';
import {TaskDetailsComponent} from './admin-dashboard/components/task-details/task-details.component';
import {ReportsComponent} from './admin-dashboard/components/reports/reports.component';
import {AppModule} from "../../../app.module";
import {HeaderComponent} from "../../../layout/header/header.component";
import {FooterComponent} from "../../../layout/footer/footer.component";
import {SidebarComponent} from "../../../layout/sidebar/sidebar.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {CreateCategoriesComponent} from './admin-dashboard/components/create-categories/create-categories.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import { TaskUpdateComponent } from './admin-dashboard/components/task-update/task-update.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatTreeModule} from "@angular/material/tree";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import { LogTimeComponent } from './admin-dashboard/components/log-time/log-time.component';
import {MatDialogModule} from "@angular/material/dialog";
import { UpdateCategoryComponent } from './admin-dashboard/components/update-category/update-category.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    TaskComponent,
    TaskAssignedComponent,
    CreateTaskComponent,
    CategoriesComponent,
    UsersComponent,
    TaskDetailsComponent,
    ReportsComponent,
    CreateCategoriesComponent,
    TaskUpdateComponent,
    LogTimeComponent,
    UpdateCategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTreeModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: []
})
export class AdminModule {
}
