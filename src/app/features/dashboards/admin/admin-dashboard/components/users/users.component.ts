import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpService} from "../../../../../../shared/services/http.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UpdateUserComponent} from "../update-user/update-user.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource!: MatTableDataSource<any>
  displayedColumns = ['sn', 'name', 'email', 'role', 'action']
  preloader = false;

  readonly dialog = inject(MatDialog);


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort


  constructor(
    private httpService: HttpService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.fetChUsers();
  }

  fetChUsers(): void {

    this.preloader = true

    const subUrl = '/api/users';

    this.httpService.getResource(subUrl)
      .subscribe({
        next: value => {
          this.dataSource = new MatTableDataSource<any>(value);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: err => {
          this.preloader = false;
          console.log('Error fetching users<>', err);
        },
        complete: () => {
          this.preloader = false;
        }
      })
  }

  updateUser(element: any): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: {
        userData: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetChUsers();
    });

  }

  removeUser(element: any): void {

    this.preloader = true;

    const subUrl = `/api/users/${element.id}`;

    this.httpService.deleteResource(subUrl)
      .subscribe({
        next: value => {
          this.toastrService.success('User deleted successfully');
        },
        complete: () => {
          this.preloader = false
          this.fetChUsers();
        },
        error: err => {
          console.log('Error deleting User<>', err);
          this.toastrService.error("Error deleting user");
          this.preloader = false;
        }
      })


  }
}
