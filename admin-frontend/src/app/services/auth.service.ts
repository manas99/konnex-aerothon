import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './config.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient, private config: ConfigService) { }

	login(username: string, pass: string) {
		var params = {};
		params['username'] = username;
		params['password'] = pass;
		return this.http.post<any>(this.config.BASE_API_URL + 'auth/login', params).pipe(tap(
			res => {
				if (res.result && res.result.access_token) {
					this.config.setServerTime();
					localStorage.setItem('access_token', res.result.access_token);
					localStorage.setItem('refresh_token', res.result.refresh_token);
					localStorage.setItem('expires_in', String(res.result.expires_in));
					localStorage.setItem('scope', res.result.scope);
					localStorage.setItem('token_type', res.result.token_type);
				}
			}
		));
	}

	create(data: any) {
		return this.http.post<any>(this.config.BASE_API_URL + 'users/create', data)
	}

	logout() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('scope');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('expires_in');
		localStorage.removeItem('token_type');
		localStorage.removeItem('user');
	}

	isLoggedIn() {
		if (localStorage.getItem('access_token')) {
			return true;
		}
		return false;
	}

	getUser() {
		var user = JSON.parse(localStorage.getItem('user'))
		return user;
	}

	validate() {
		return this.http.get<any>(this.config.BASE_API_URL + "users/validate");
	}

	read() {
		return this.http.get<any>(this.config.BASE_API_URL + "users/read");
	}

	delete(id: number) {
		var params = {};
		params['user_id'] = id;
		return this.http.post<any>(this.config.BASE_API_URL + 'users/delete', params)
	}

	edit(user: any) {
		return this.http.post<any>(this.config.BASE_API_URL + 'users/edit', user)
	}

	// getDashboard() {
	// 	return this.http.get<any>(this.config.BASE_API_URL + 'users/dashboard/read')
	// }

	updatePassword(pass) {
		return this.http.post<any>(this.config.BASE_API_URL + 'users/password/update', { password: pass })
	}

}
