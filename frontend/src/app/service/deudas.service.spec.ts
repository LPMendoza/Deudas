import { TestBed } from '@angular/core/testing';

import { DeudasService } from './deudas.service';

describe('DeudasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeudasService = TestBed.get(DeudasService);
    expect(service).toBeTruthy();
  });
});
