import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { AbstractControl, AsyncValidator, } from "@angular/forms";
import { map, catchError, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UniqueUsername implements AsyncValidator {
    constructor(private authService:AuthService) { }

    validate = (control: AbstractControl) => {
        const { value } = control

        return this.authService.usernameAvailable(value)
        .pipe(
            map(() => {
                if (value.available) {
                    return null as any;
                }


            }),
            catchError((err) => {


                if (err.error.username) {
                    return of({ nonUniqueUsername: true })
                } else {
                    return of({ noConnection: true })
                };


            })
        );
    };
}
