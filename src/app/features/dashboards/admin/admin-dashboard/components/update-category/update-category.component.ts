import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MyErrorStateMatcher} from "../../../../../../utils/error-state-matcher";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../../../../shared/services/http.service";
import {ToastService} from "../../../../../../shared/services/toast.service";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<UpdateCategoryComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  cateData!: any;

  preloader = false;

  matcher = new MyErrorStateMatcher();

  cateUpdateFormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(10)]),

  })

  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.cateData = this.data.data;
    this.mapperCateValues();
  }

  mapperCateValues(): void {
    this.cateUpdateFormGroup.patchValue({
      description: this.cateData.description,
      name: this.cateData.name
    })
  };

  updateCategory(): void {
    this.preloader = true
    const subUrl = `/api/categories/${this.cateData.id}`;

    this.httpService.putResource(subUrl, this.cateUpdateFormGroup.value)
      .subscribe({
        next: value => {
          this.toastService.showSuccess('Category updated successfully');
        },
        error: err => {
          this.toastService.showError('Error updating category');
          console.log('Error updating category<>', err);
          this.preloader = false;
        },
        complete: () => {
          this.dialogRef.close();
          this.preloader = false;
        }
      })


  }
}
