import { ErrorHandler, Injectable } from '@angular/core';
//import { LocationStrategy, PathLocationStrategy } from '@angular/common';
//import * as StackTrace from 'stacktrace-js';

declare let alertify: any;

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

	constructor() { }

	handleError(error: any) {
		console.log(error);
		console.log(error.error);
		// TODO: add error handler functions
		if (error.status == 401) {
			alertify.error("Unauthorized.");
			return;
		}
		if (error.error && error.error.detail) {
			alertify.error(error.error.detail);
			return;
		}
		if (error.error && !error.error.success) {
			if (Array.isArray(error.error.message)) {
				error.error.message.forEach((item: any) => {
					alertify.error(item);
				})
			} else {
				alertify.error(error.error.message);
			}
			return;
		}
	}

}
