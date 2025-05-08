import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatSelectModule,
    ToastrModule.forRoot({
      positionClass: 'top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    })
  ],
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    },

  ]
})
export class AuthModule {
}
