import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, catchError } from 'rxjs';
import { CreateUserDto, User } from 'src/api';

@Injectable({ providedIn: 'root' })
export class AuthService {

  access_token: string = ''

    constructor(private _httpClient: HttpClient) { }

    login(user: Omit<User, 'avatar' | 'nickname'>) {
        return this._httpClient.post<any>(`http://localhost:8888/auth/login`, user, {withCredentials:true})
        .pipe(
            tap(data => {
              console.log(data)
              this.access_token = data
            }),
            catchError(error => {
                console.error(error);
                throw error
            })
        )
    }

    createUser(user: CreateUserDto) {
        return this._httpClient.post<User>(`http://localhost:8888/users`, user).pipe(
            catchError(error => {
                console.error(error);
                throw error
            })
        )
    }
}
