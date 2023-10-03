import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTalleresComponent } from './dialog-talleres.component';

describe('DialogTalleresComponent', () => {
  let component: DialogTalleresComponent;
  let fixture: ComponentFixture<DialogTalleresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogTalleresComponent]
    });
    fixture = TestBed.createComponent(DialogTalleresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
