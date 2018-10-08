import { TestBed, inject } from '@angular/core/testing';

import { DlqServiceService } from './dlq-service.service';

describe('DlqServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DlqServiceService]
    });
  });

  it('should be created', inject([DlqServiceService], (service: DlqServiceService) => {
    expect(service).toBeTruthy();
  }));
});
