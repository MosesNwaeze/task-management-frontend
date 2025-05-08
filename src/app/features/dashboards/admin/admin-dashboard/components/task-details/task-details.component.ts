import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../../../../shared/services/http.service";
import {ActivatedRoute} from "@angular/router";
import {ITaskType} from "../../../../../../types/itask-type";
import {MatSelectChange} from "@angular/material/select";
import {MatTab} from "@angular/material/tabs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LogTimeComponent} from "../log-time/log-time.component";
import {ToastService} from "../../../../../../shared/services/toast.service";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  task!: ITaskType;
  preloader = false;
  dataSource!: MatTableDataSource<any>;
  taskId!: number

  status = ['IN_PROGRESS', 'DONE', 'PENDING']
  displayedColumns = ['sn', 'date-logged', 'time-spent', 'task-name', 'created-by']

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe({
      next: value => {

        this.taskId = Number(value.get('id'))
        this.fetchLoggedHours(this.taskId);

        this.fetchDetails(this.taskId);

      }
    })
  }


  openDialog(): void {
    console.log(this.taskId, 'task<><>');
    const dialogRef = this.dialog.open(LogTimeComponent, {
      data: {
        taskId: this.taskId,
        refresh: this.fetchLoggedHours
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchLoggedHours(this.taskId);
    });
  }


  fetchDetails(id: number): void {

    this.preloader = true;

    const subUrl = `/api/tasks/${id}`;
    this.httpService.getResource(subUrl)
      .subscribe({
        next: value => {
          this.task = value
        },
        error: err => {
          console.log('Error fetching task', err);
          this.preloader = false;
        },
        complete: () => {
          this.preloader = false;
        }
      })

  }

  fetchLoggedHours(taskId: number): void {
    const subUrl = `/api/tasks/${taskId}/log-hours`;

    this.httpService.getResource(subUrl)
      .subscribe({
        next: value => {

          this.dataSource = new MatTableDataSource<any>(value);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        complete: () => {

        },
        error: err => {
          console.log('Error fetching logged in hours<>', err);
        }
      })
  }

  changeStatus(event: MatSelectChange): void {

    const status = event.value;

    const subUrl = `/api/tasks/${this.taskId}`;
    this.httpService.putResource(subUrl, {status: status})
      .subscribe({
        next: value => {

        },
        error: err => {
          console.log('Error updating task status', err);
          this.toastService.showError('Error updating task status');
        },
        complete: () => {
          this.toastService.showSuccess('Status updated successfully');
        }
      })

  }
}

