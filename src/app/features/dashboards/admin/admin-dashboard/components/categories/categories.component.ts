import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ICategoryType} from "../../../../../../types/i-category-type";
import {HttpService} from "../../../../../../shared/services/http.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ToastService} from "../../../../../../shared/services/toast.service";
import {UpdateCategoryComponent} from "../update-category/update-category.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories!: MatTableDataSource<any>;
  preloader = false;

  displayedColumns = ['sn', 'name', 'description', 'created-by', 'edit', 'delete'];

  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {

    const subUrl = '/api/categories'

    this.preloader = true;

    this.httpService.getResource(subUrl)
      .subscribe({
        next: value => {
          this.categories = new MatTableDataSource<any>(value)
          this.categories.paginator = this.paginator
          this.categories.sort = this.sort
          console.log(value, '<><><>');

        },
        error: err => {
          console.log('Error fetching categories', err);
          this.preloader = false;
        },
        complete: () => {
          this.preloader = false;
        },
      })
  }

  edit(cat: ICategoryType): void {

  }

  delete(cat: ICategoryType): void {

  }

  addTask() {
    this.router.navigate(['/dashboard/categories/create']).then()
  }

  remove(element: any): void {

    const subUrl = `/api/categories/${element.id}`;

    this.httpService.deleteResource(subUrl)
      .subscribe({
        next: value => {
          this.toastService.showSuccess('Categories deleted successfully');
        },
        error: err => {
          console.log('Error deleting categories', err);
          this.toastService.showError('Error deleting categories');
        },
        complete: () => {
          this.fetchCategories();
        }
      })

  }

  update(element: any): void {

    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      data: {
        data: element
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchCategories();
    });

  }

  filterCategory(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();
  }
}
