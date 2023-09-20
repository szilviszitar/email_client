import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';


interface UsernameAvailableResponse {
  available: boolean;
}
export interface SignupCredentials {
  username: string;
  password: string;
  passwordComfirmation: string;
}
interface SignupResponse {
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }


  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>('https://api.angular-email.com/auth/username', {
      username: username
    });

  }
  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>('https://api.angular-email.com/auth/signup', credentials,)
      .pipe(
        tap(() => {
          this.signedin$.next(true)
        })
      )
  }

  checkAuth() {
    return this.http
      .get('https://api.angular-email.com/auth/signedin',)
      .pipe(
        tap(response => {
          console.log(response);

        })
      )
  }
}

