import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';

describe('SocketService', () => {
	let service: SocketService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SocketsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
