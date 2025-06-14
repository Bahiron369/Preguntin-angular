import { TestBed } from '@angular/core/testing';

import { ObtenerPreguntasPublicService } from './obtener-preguntas-public.service';

describe('ObtenerPreguntasPublicService', () => {
  let service: ObtenerPreguntasPublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerPreguntasPublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
