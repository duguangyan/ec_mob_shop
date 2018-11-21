import { TestBed, inject } from '@angular/core/testing';

import { TotastService } from './totast.service';

describe('TotastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TotastService]
    });
  });

  it('should be created', inject([TotastService], (service: TotastService) => {
    expect(service).toBeTruthy();
  }));
});
