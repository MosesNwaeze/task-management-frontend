import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MyErrorStateMatcher} from "../../../../../../utils/error-state-matcher";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../../../shared/services/toast.service";
import {HttpService} from "../../../../../../shared/services/http.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<UpdateUserComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  userData!: any;

  matcher = new MyErrorStateMatcher();

  preloader = false;

  roles = ['ADMIN', 'USER'];


  updateUserFormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ])
  })


  constructor(
    private toastService: ToastService,
    private httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.userData = this.data.userData;

    this.mapper();
  }

  mapper(): void{

    this.updateUserFormGroup.patchValue({
      email: this.userData.email,
      password: this.userData.password,
      name: this.userData.name,
      role: this.userData.role
    })
  }

  updateUser(): void {

    this.preloader = true
    const suBurl = `/api/users/${this.userData.id}`;

    this.httpService.putResource(suBurl, this.updateUserFormGroup.value)
      .subscribe({
        next: value => {
          this.toastService.showSuccess('User updated successfully');
        },
        complete: () => {
          this.preloader = true;
          this.dialogRef.close()
        },
        error: err => {
          console.log('Error updating user<>', err);
          this.toastService.showError('Error updating User');
          this.preloader = false;
        }
      })

  }
}
