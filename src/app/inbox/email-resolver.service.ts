import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EmailService } from './email.service';
import { inject } from '@angular/core';
import { Email } from './email';
import { EMPTY, catchError } from 'rxjs';

 
 
export const EmailResolverService: ResolveFn<Email> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const router= inject(Router);
          return  inject(EmailService).getEmail(route.paramMap.get('id')!)
          .pipe(
            catchError(()=>{
                router.navigateByUrl("/inbox/not-found");
                return EMPTY

               
            })
          );
      
    };



