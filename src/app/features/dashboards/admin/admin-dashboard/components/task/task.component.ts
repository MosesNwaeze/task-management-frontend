import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../../../../shared/services/http.service";
import {ITaskType} from "../../../../../../types/itask-type";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatSelectChange} from "@angular/material/select";
import {AuthService} from "../../../../../../shared/services/auth.service";
import {ToastService} from "../../../../../../shared/services/toast.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  preloader = false;
  tasks!: MatTableDataSource<any>;

  displayedColumns = ['sn', 'title', 'status', 'start-date', 'end-date', 'assign', 'action'];

  statusEnum = ['IN_PROGRESS', 'DONE', 'PENDING'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private httpService: HttpService,
    private router: Router,
    protected authService: AuthService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.fetchTasks();
  }

  addTask(): void {
    this.router.navigate(['/dashboard/tasks/create'])
      .then();
  }

  edit(task: ITaskType) {

  }

  delete(task: ITaskType) {

  }

  fetchTasks(): void {

    this.preloader = true;


    const subUrl = '/api/tasks';

    this.httpService.getResource(subUrl)
      .subscribe({
        next: value => {
          this.tasks = new MatTableDataSource<any>(value);
          this.tasks.paginator = this.paginator;
          this.tasks.sort = this.sort;

        },
        error: err => {
          console.log("Error fetching tasks", err);
          this.preloader = false;
        },
        complete: () => {
          this.preloader = false;
        }
      })
  }

  update(element: any): void {
    this.router.navigate([`/dashboard/task/update/${element.id}`]).then()
  }

  filterByStatus(event: MatSelectChange): void {
    this.tasks.filter = event.value;
  }

  assignToMe(element: any): void {
    const subUrl = `/api/tasks/${element.id}/assign/${Number(this.authService.getUserId())}`;
    this.httpService.putResource(subUrl, {})
      .subscribe({
        next: value => {
          this.fetchTasks();
        },
        complete: () => {
          this.toastService.showSuccess('Task assigned to me successfully');
        },
        error: err => {
          console.log('Error Assigning task to me', err);
          this.toastService.showError('Error Assigning task to me');
        }
      })

  }

  viewDetails(element: any): void {
    this.router.navigate([`/dashboard/tasks/${element.id}`])
      .then();

  }
}
