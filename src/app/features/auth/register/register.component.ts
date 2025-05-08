import {Component, OnInit} from '@angular/core';
import {MyErrorStateMatcher} from "../../../utils/error-state-matcher";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../shared/services/http.service";
import {AuthService} from "../../../shared/services/auth.service";
import {ToastService} from "../../../shared/services/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  roles = ['ADMIN', 'USER'];


  registerFormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required,Validators.minLength(6)]),
    name: new FormControl<string>('', [Validators.required,Validators.minLength(6)]),
    role: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ])
  })

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {


  }

  register(): void {


    if (this.registerFormGroup.valid) {

      const email = this.registerFormGroup.controls.email.value as string;
      const password = this.registerFormGroup.controls.password.value as string;
      const name = this.registerFormGroup.controls.name.value as string;
      const role = this.registerFormGroup.controls.role.value as string;


      const subUrl = '/api/auths/register';

      this.httpService.createResource(subUrl, {
          email,
          password,
          name,
          role,
        }
      )
        .subscribe({
          next: value => {
            const token = value.token;
            const role = value.userDetails.role;

            this.authService.setRole(role);
            this.authService.setAuthToken(token);
          },
          error: err => {
            this.toastService.showError(err.error.message)
            console.log('Error in Register<>', err);
          },
          complete: () => {
            this.toastService.showSuccess('User account created successfully');
            this.router.navigate(['/auth/login'])
              .then()
          }
        })
    }

  }

}
