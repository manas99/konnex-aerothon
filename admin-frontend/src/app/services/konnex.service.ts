import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class KonnexService {

  	constructor(private http: HttpClient, private config: ConfigService) { }
}
