import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private router: Router, private auth: AuthService) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!localStorage.getItem('access_token')) {
			this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
			return false;
		}
		return this.auth.validate().pipe(
			map((res) => {
				if (res.success) {
					localStorage.setItem('user', JSON.stringify(res.result.user));
					localStorage.setItem('is_superuser', JSON.stringify(res.result.is_superuser));
					localStorage.setItem('permissions', JSON.stringify(res.result.permissions));
					return true;
				}
				return false;
			}),
			catchError((error) => {
				console.log(error);
				this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
				return of(false);
			})
		);
	}

}
