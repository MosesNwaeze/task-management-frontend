import {Component, inject, Input, OnInit,} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../../../../../utils/error-state-matcher";
import {HttpService} from "../../../../../../shared/services/http.service";
import {ToastService} from "../../../../../../shared/services/toast.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-log-time',
  templateUrl: './log-time.component.html',
  styleUrls: ['./log-time.component.css']
})
export class LogTimeComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  readonly dialogRef = inject(MatDialogRef<LogTimeComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  taskId!: number;


  logTimeFormGroup = new FormGroup({
    timeSpent: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^\d+[hH] \d+[mM]$/)
    ]),
  })

  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.taskId = this.data.taskId;
  }

  logTime(): void {

    console.log(this.taskId, 'task id<>');

    const subUrl = `/api/tasks/${Number(this.taskId)}/log-hour`;

    this.httpService.createResource(subUrl, this.logTimeFormGroup.value)
      .subscribe({
        next: value => {
          this.toastService.showSuccess('Time logged successfully');
        },
        error: err => {
          this.toastService.showError(err.error.message || 'Error creating time log');
          console.log('Error creating time log', err);
        },
        complete: () => {

          this.dialogRef.close();


        }
      })

  }
}
