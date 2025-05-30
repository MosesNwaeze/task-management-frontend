import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MyErrorStateMatcher} from "../../../../../../utils/error-state-matcher";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../../../../shared/services/http.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../../../../shared/services/toast.service";
import {ICategoryType} from "../../../../../../types/i-category-type";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  statusEnum = ['IN_PROGRESS', 'DONE', 'PENDING']
  categories: Array<ICategoryType> = [];

  preloader = false;

  createTaskFormGroup = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(10)]),
    status: new FormControl<string>('', [
      Validators.required, Validators.minLength(4)
    ]),
    startDate: new FormControl<string>('', [Validators.required]),
    endDate: new FormControl<string>('', [Validators.required]),
    category: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(20)])
  })

  constructor(
    private httpService: HttpService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.fetchCategory();
  }

  fetchCategory(): void {
    this.preloader = true;

    const subUrl = '/api/categories';

    this.httpService.getResource(subUrl)
      .subscribe({
        next: value => {
          this.categories = value;
        },
        error: err => {
          this.preloader = false;
          console.log('Error fetching categories', err);
        },
        complete: () => {
          this.preloader = false;
        },
      })

    this.preloader = false;

  }

  create() {
    const catId = this.createTaskFormGroup.controls.category.value as string
    const subUrl = `/api/tasks/${catId}`;

    this.httpService.createResource(subUrl, this.createTaskFormGroup.value)
      .subscribe({
        next: value => {
          this.toastService.showSuccess('Task created successfully');
        },
        error: err => {
          console.log(err, 'Error creating task')
          this.toastService.showError(err.error.message || 'Server Error while creating task');
        },
        complete: () => {
          this.router.navigate(['/dashboard/tasks'])
            .then();
        }
      })

  }

}
