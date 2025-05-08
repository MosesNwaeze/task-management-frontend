import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../../../../../utils/error-state-matcher";
import {HttpService} from "../../../../../../shared/services/http.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../../../../shared/services/toast.service";

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  createCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(10)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(20)])
  })

  constructor(
    private httpService: HttpService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
  }

  create() {
    const subUrl = '/api/categories';
    const name = this.createCategoryFormGroup.controls.name.value as string;
    const description = this.createCategoryFormGroup.controls.description.value as string;

    this.httpService.createResource(subUrl, {
      name,
      description
    })
      .subscribe({
        next: value => {
          this.toastService.showSuccess('Category created successfully');
        },
        error: err => {
          console.log(err, 'Error creating category')
          this.toastService.showError(err.error.message || 'Server Error while creating category');
        },
        complete: () => {
          this.router.navigate(['/dashboard/categories'])
            .then();
        }
      })

  }
}
