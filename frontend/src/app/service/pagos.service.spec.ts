import { TestBed } from '@angular/core/testing';

import { PagosService } from './pagos.service';

describe('PagosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagosService = TestBed.get(PagosService);
    expect(service).toBeTruthy();
  });
});
