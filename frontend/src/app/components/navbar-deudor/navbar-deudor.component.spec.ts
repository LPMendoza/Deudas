import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDeudorComponent } from './navbar-deudor.component';

describe('NavbarDeudorComponent', () => {
  let component: NavbarDeudorComponent;
  let fixture: ComponentFixture<NavbarDeudorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarDeudorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarDeudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
