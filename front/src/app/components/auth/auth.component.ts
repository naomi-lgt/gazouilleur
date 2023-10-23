import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router, private readonly _snackbar: SnackbarService) {
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

  // Méthode qui permet de log l'utilisateur, après inscription ou juste par appui sur bouton login
  submitData(formValue: any) {
      return this.authService.login(formValue).pipe(
        map(data => console.log(data)),
        catchError(() => {
          this._snackbar.openSnackBar(`E-mail et / ou mot de passe non trouvé(s)`, 'OK')
          return of()
        })
      ).subscribe(() => this.router.navigate(['']))
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
        next: () => {
          this._snackbar.openSnackBar('Compte créé ! 🐦', 'OK');
        },
        error: (error) => {
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
