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
interface SignedinResponse {
  authenticated: boolean;
  username: string;
}
interface SigninResponse{
  username:string;
}
export interface SigninCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(true);
  username= '';

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
        tap(({username}) => {
          this.signedin$.next(true);
          this.username= username;
        })
      )
  }

  checkAuth() {
    return this.http
      .get<SignedinResponse>('https://api.angular-email.com/auth/signedin',)
      .pipe(
        tap(({ authenticated , username}) => {
          this.signedin$.next(authenticated);
          this.username=username;

        })
      )
  }

  signout() {
    return this.http
      .post('https://api.angular-email.com/auth/signout', {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);

        })
      );
  }

  signin(credentials: SigninCredentials) {
    return this.http
      .post<SigninResponse>('https://api.angular-email.com/auth/signin', credentials)
      .pipe(
        tap(({username}) =>{
          this.signedin$.next(true);
          this.username=username;
        })
      )
  }
}

