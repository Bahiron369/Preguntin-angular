import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntajeGlobalCategoriaComponent } from './puntaje-global-categoria.component';

describe('PuntajeGlobalCategoriaComponent', () => {
  let component: PuntajeGlobalCategoriaComponent;
  let fixture: ComponentFixture<PuntajeGlobalCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PuntajeGlobalCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntajeGlobalCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
