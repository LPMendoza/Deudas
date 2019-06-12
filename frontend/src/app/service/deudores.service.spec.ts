import { TestBed } from '@angular/core/testing';

import { DeudoresService } from './deudores.service';

describe('DeudoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeudoresService = TestBed.get(DeudoresService);
    expect(service).toBeTruthy();
  });
});
