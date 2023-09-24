import { Injectable } from "@angular/core";
import { Router, Route, UrlSegment, UrlTree, } from "@angular/router";
import { Observable, skipWhile, take, tap } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.signedin$.pipe(
      skipWhile(value => value === null),
      take(1),
      tap((authenticated: boolean) => {
        if (!authenticated) {
          this.router.navigate(['/']);
        }
      }),
    );
  }
}
