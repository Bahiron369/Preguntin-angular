import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePublicComponent } from './game-public.component';

describe('GamePublicComponent', () => {
  let component: GamePublicComponent;
  let fixture: ComponentFixture<GamePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
