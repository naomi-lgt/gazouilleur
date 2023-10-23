
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable()
export class IsAuthenticated implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // Si on a déjà récupérer un token on considère que l'utilisateur est déjà connecté
        const isAlreadyLogged = !!this._authService.access_token && this._authService.access_token.length > 0
        if (!isAlreadyLogged) {
            this._router.navigateByUrl('/login')
        }
        return true
    }
}
