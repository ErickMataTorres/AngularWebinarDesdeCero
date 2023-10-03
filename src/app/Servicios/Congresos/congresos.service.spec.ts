import { TestBed } from '@angular/core/testing';

import { CongresosService } from './congresos.service';

describe('CongresosService', () => {
  let service: CongresosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongresosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
