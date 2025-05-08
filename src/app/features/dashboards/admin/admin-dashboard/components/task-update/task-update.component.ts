import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../../../../../shared/services/http.service";
import {ITaskType} from "../../../../../../types/itask-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../../../../../utils/error-state-matcher";
import {ToastService} from "../../../../../../shared/services/toast.service";

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {

  task!: ITaskType;
  preloader = false;
  activeTaskId = 0;

  matcher = new MyErrorStateMatcher();

  taskUpdateFormGroup = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(10)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(20)]),
    startDate: new FormControl<string>('', [Validators.required]),
    endDate: new FormControl<string>('', [Validators.required])
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe({
      next: value => {

        this.activeTaskId = Number(value['id'])

        this.fetchTask(Number(value['id']));
      }
    })
  }


  fetchTask(id: number): void {

    this.preloader = true;

    const subUrl = `/api/tasks/${id}`;

    this.httpService.getResource(subUrl)
      .subscribe({
        next: value => {
          this.task = value;
          console.log(value, 'value<>');

          this.taskUpdateFormGroup.patchValue({
            description: value.description,
            endDate: value.endDate,
            title: value.title,
            startDate: value.startDate
          })
        },
        complete: () => {
          this.preloader = false;
        },
        error: err => {
          this.preloader = false;
          console.log(err, 'Error fetching task')
        }
      })
  }

  updateTask(): void {

    const subUrl = `/api/tasks/${this.activeTaskId}`

    this.httpService.putResource(subUrl, this.taskUpdateFormGroup.value)
      .subscribe({
        next: value => {
          this.toastService.showSuccess('Task updated successfully');
        },
        error: err => {
          console.log("Error updating task<>", err)
          this.toastService.showError('Error updating task');
        },
        complete: () => {

          this.router.navigate(['/dashboard/task/assigned'])
            .then();

        }
      })

  }
}
