/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { APIServiceService } from './API-service.service';

describe('Service: APIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIServiceService]
    });
  });

  it('should ...', inject([APIServiceService], (service: APIServiceService) => {
    expect(service).toBeTruthy();
  }));
});
