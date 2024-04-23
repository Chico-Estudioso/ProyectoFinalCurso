import { TestBed } from '@angular/core/testing';

import { ServicioBasicoService } from './servicio-basico.service';

describe('ServicioBasicoService', () => {
  let service: ServicioBasicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBasicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
