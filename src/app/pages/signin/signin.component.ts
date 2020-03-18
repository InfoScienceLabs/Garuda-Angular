import { Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../auth/authentication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { first } from "rxjs/operators";
import { Error } from "../../models/models";
import { HttpErrorResponse } from "@angular/common/http";
import { isObject } from "util";
import { AdminService } from "../../shared/_services/service";
import { MatSnackBar } from "@angular/material";
import { SocketService } from "src/app/services/services";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  hide = true;
  returnUrl: string;
  userForm: FormGroup;
  submitted: Boolean = false;
  loading: Boolean = false;
  error: any;
  openSignUp: Boolean;
  name: string;
  phone: string;
  email: string;
  password: string;
  // passwordConfirm: string;
  dob: string;
  registerForm: FormGroup;
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
  // formErrors = {
  //   email: "",
  //   password: ""
  // };
  // validationMessages = {
  //   email: {
  //     required: "Email Required",
  //     email: "Email Format is Wrong"
  //   },
  //   password: {
  //     required: "Password Required",
  //     pattern: "Pattern Format is Wrong",
  //     minlength: "Min Lenght 4",
  //     maxlength: "Max Lenght 25"
  //   }
  // };

  constructor(
    private user: AdminService,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private socketService: SocketService
  ) {
     
  }

  ngOnInit() {
    this.loading = false;
    this.openSignUp =  false;
    this.buildFormForLogin();
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  buildFormForLogin() { 
    this.error = '';   
    this.userForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });
    this.openSignUp = false;
    // this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    // this.onValueChanged();
  }
  buildFormForSignup(){
    this.error = '';
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
    this.openSignUp = true;
    // this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    // this.onValueChanged();
}
  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
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

  signInWithEmail() {
    this.socketService.logout_notify(); 
    if (this.userForm.invalid) {
      return;
    }
    this.error = "";
    this.loading = true;
    this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          let currentUser;
          currentUser = JSON.parse(localStorage.getItem("currentUser"));
          
          this.socketService.initSocket();
          if(currentUser && currentUser.address && currentUser.address.street)
            this.router.navigate(["/" + data.roleId]);
          else 
            this.router.navigate(["/" + data.roleId + "/marketplace"]);

          // this.router.navigate([this.returnUrl]);
        },
        (error: HttpErrorResponse) => {
          this.error = error.error["message"];
          this.loading = false;
          this.submitted = false;
        }
      );
    // this.auth
    //   .emailLogin(this.userForm.value['email'], this.userForm.value['password'])
    // .catch(error => console.log('Error:', error));
  }

  signInAnonymously() {
    this.auth.anonymousLogin().then(() => this.afterSignIn());
  }

  login() {
    this.submitted = true;
    this.signInWithEmail();
  }

  private afterSignIn() {
    this.router.navigate(["/"]);
  }
  get f() {
    return this.userForm.controls;
  }
  register() {
    this.signUpWithEmail();
  }
  signUpWithEmail() {
    this.error = '';
    if (isObject(this.registerForm.value.dob))
      this.registerForm.value.dob = this.registerForm.value.dob.toISOString();
    this.submitted = true;
    if (this.registerForm.invalid) return;
    this.loading = true;
    
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
          this.openSignUp = false;
          this.submitted = false;

        },
        (error : Error) => {
          //  this.alertService.error(error);
          this.error = error.error['message'];
          this.loading = false;
          this.submitted = false;
        }
      );
  }
  
}
