import {
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from "../../shared/_services/service";
import { AuthenticationService } from "../../auth/authentication.service";
import { first } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import { isObject } from "util";
import { Error } from '../../models/models';
import { User } from '../../models/models';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  name: string;
  phone: string;
  email: string;
  password: string;
  // passwordConfirm: string;
  dob: string;
  registerForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  error: string;
  current_date: Date;
  startDate: Date;
  formErrors = {
    email: "",
    password: "",
    phone: ""
  };
  validationMessages = {
    email: {
      required: "Email Required",
      email: "Email Format is Wrong"
    },
    password: {
      required: "Password Required",
      pattern: "Pattern Format is Wrong",
      minlength: "Min Lenght 4",
      maxlength: "Max Lenght 25"
    },
    phone: {
      required: 'Phone Number Required',
      pattern: 'Please enter 0-9 digits Only',
    }
  };
  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private user: AdminService,
    private auth_service: AuthenticationService,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
  }
  ngOnInit() { 
    this.loading = false;
    this.current_date = new Date();
    this.startDate = new Date(1990, 0, 1);
    if (this.auth_service.currentUser) {
      this.router.navigate(["/"]);
      return;
    }
    
  }
  signUpWithEmail() {
    this.error = '';
    if (isObject(this.registerForm.value.dob))
      this.registerForm.value.dob = this.registerForm.value.dob.toISOString();
    this.submitted = true;
    if (this.registerForm.invalid) return;
    this.loading = true;
    console.log(this.registerForm.value);
    
    this.user
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.alertService.sucess('Registration Successful', true);
          this.snackBar.open("Success", "Close", {
            duration: 2000,
            panelClass: ["snackbar-color-change"]
          });
          this.loading = false;
          this.router.navigate(["/login"]);
        },
        (error : Error) => {
          //  this.alertService.error(error);
          console.log(error);
          this.error = error.error['message'];
          this.loading = false;
          this.submitted = false;
        }
      );
  }
  buildForm() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          // Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ],
      dob: ["", Validators.required]
    });
    // this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    // this.onValueChanged();
  }
  get f() {
    return this.registerForm.controls;
  }
  ngOnChanges(data?: any) {
    if (!this.registerForm) {
      return;
    }
    const form = this.registerForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  }
  signInWithGoogle() {
    // this.auth.googleLogin().then(() => this.afterSignIn());
  }
  signInWithGithub() {
    // this.auth.githubLogin().then(() => this.afterSignIn());
  }
  signInAnonymously() {
    this.auth.anonymousLogin().then(() => this.afterSignIn());
  }
  register() {
    this.signUpWithEmail();
  }
  private afterSignIn() {
    this.router.navigate(["/"]);
  }
}
