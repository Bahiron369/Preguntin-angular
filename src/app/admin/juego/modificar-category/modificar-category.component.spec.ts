import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCategoryComponent } from './modificar-category.component';

describe('ModificarCategoryComponent', () => {
  let component: ModificarCategoryComponent;
  let fixture: ComponentFixture<ModificarCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
