import {Component, OnInit, ViewChild} from '@angular/core';
import {ITaskType} from "../../../../../../types/itask-type";
import {HttpService} from "../../../../../../shared/services/http.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSelectChange} from "@angular/material/select";
import {ToastService} from "../../../../../../shared/services/toast.service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-task-assigned',
  templateUrl: './task-assigned.component.html',
  styleUrls: ['./task-assigned.component.css']
})
export class TaskAssignedComponent implements OnInit {

  preloader = false;

  statusEnum = ['IN_PROGRESS', 'DONE', 'PENDING']

  users: Array<any> = [];

  tasks!: MatTableDataSource<any>;

  displayedColumns = ['sn', 'title', 'status', 'start-date', 'end-date', 'action'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchTasks();
  }

  fetchTasks(): void {

    this.preloader = true;

    const subUrl = '/api/tasks/assigned';

    this.httpService.getResource(subUrl)
      .subscribe({
        next: value => {
          this.tasks = new MatTableDataSource<any>(value);
          this.tasks.paginator = this.paginator;
          this.tasks.sort = this.sort;
        },
        complete: () => {

          this.preloader = false;
        },
        error: err => {
          console.log('Error fetching assigned tasks', err);
          this.preloader = false;
        }
      })


  }

  fetchUsers(): void {

    const subUrl = '/api/users';

    this.httpService.getResource(subUrl)
      .subscribe({
        next: value => {
          this.users = value;
          console.log(value, 'users<>');
        },
        error: err => {
          console.log('Error fetching users', err);
        },
        complete: () => {
        }

      })
  }

  updateStatus(event: MatSelectChange, task: any): void {

    const subUrl = `/api/tasks/${task.id}`;

    this.httpService.putResource(subUrl, {status: event.value})
      .subscribe({
        next: value => {
        },
        complete: () => {
          this.toastService.showSuccess('Status updated successfully');
        },
        error: err => {
          console.log('Error updating status<>', err);
          this.toastService.showError("Error updating task status")
        }
      })

  }

  reAssignTask(event: MatSelectChange, task: any): void {

    const subUrl = `/api/tasks/${task.id}/assign/${event.value}`;
    this.httpService.putResource(subUrl, {})
      .subscribe({
        next: value => {
        },
        complete: () => {
          this.toastService.showSuccess('Task assigned successfully');
        },
        error: err => {
          console.log('Error assigning task', err);
          this.toastService.showError('Error assigning task');
        }
      })

  }

  update(task: any): void {

    this.router.navigate([`/dashboard/task/update/${task.id}`])
      .then();

  }
}
