import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";



@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({
            withCredentials: true,

        })

        return next.handle(modifiedReq)
            .pipe(
                tap(val => {
                    console.log(val);

                })
            )
    }
}
