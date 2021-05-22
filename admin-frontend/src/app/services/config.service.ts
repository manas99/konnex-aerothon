import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	BASE_API_URL = environment.BASE_API_URL;
	BASE_HOST = environment.BASE_HOST;
	BASE_URL = environment.BASE_URL;

}
