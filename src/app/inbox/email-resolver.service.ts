import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmailService } from './email.service';
import { inject } from '@angular/core';
import { Email } from './email';

 
 
export const EmailResolverService: ResolveFn<Email> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
          return  inject(EmailService).getEmail(route.paramMap.get('id')!);
      
    };



