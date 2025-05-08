import {Component, OnInit} from '@angular/core';
import {MyErrorStateMatcher} from "../../../utils/error-state-matcher";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../shared/services/http.service";
import {AuthService} from "../../../shared/services/auth.service";
import {ToastService} from "../../../shared/services/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();


  loginFormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  login(): void {

    console.log('login check<>');

    if (this.loginFormGroup.valid) {
      const email = this.loginFormGroup.controls.email.value as string;
      const password = this.loginFormGroup.controls.password.value as string;

      const subUrl = '/api/auths/login';

      this.httpService.createResource(subUrl, {email: email, password: password})
        .subscribe({
          next: value => {
            const token = value.token;
            const role = value.userDetails.role;

            this.authService.setRole(role);
            this.authService.setAuthToken(token);
            this.authService.setUserId(value.userDetails.id);

          },
          error: err => {
            this.toastService.showError(err.error.message || 'Unable to login at the moment')
          },
          complete: () => {
            this.toastService.showSuccess('Login successful');
            this.router.navigate(['/dashboard']).then()
          }
        })
    }


  }
}
