import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(public authService: AuthService, private storageService: StorageService, private fb: FormBuilder, private router: Router, private readonly _snackbar: SnackbarService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.registerForm = this.fb.group({
      nickname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  submitData(formValue: any) {
    return this.authService.login(formValue).subscribe({
      next: data => {
        console.log(data)
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        window.location.reload();
      },
      error: err => {
        this.isLoginFailed = true;
        this._snackbar.openSnackBar(`E-mail et / ou mot de passe non trouvé(s)`, 'OK')
        return of()
      }
    })
}

  loginBtn() {
    const form = this.loginForm;
    if (form.valid) {
      this.submitData(form.value);
    }
    else return this._snackbar.openSnackBar('Les champs ne sont pas valides ❌', 'OK')
  }

  registerBtn() {
    const form = this.registerForm;
    if (form.valid) {
      return this.authService.createUser(form.value).subscribe({
        next: (data) => {
          this._snackbar.openSnackBar('Compte créé ! 🐦', 'OK');
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: (error) => {
          this.isSignUpFailed = true;
          switch(error.error.statusCode) {
            case 409:
              this._snackbar.openSnackBar('Un utilisateur a déjà ce nom ❌', 'OK');
              break;
            case 400:
              this._snackbar.openSnackBar('Le mot de passe doit faire au moins 9 caractères ❌', 'OK');
              break;
            default:
              this._snackbar.openSnackBar('Erreur lors de la création ❌', 'OK')
          }
        }
      })
    }
    else return this._snackbar.openSnackBar('Les champs ne sont pas valides ❌', 'OK')
  }
}
