// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { TransferencesComponent } from './transferences.component';

// describe('TransferencesComponent', () => {
//   let component: TransferencesComponent;
//   let fixture: ComponentFixture<TransferencesComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ TransferencesComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TransferencesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferencesComponent } from './transferences.component';

describe('TransferencesComponent', () => {
  let component: TransferencesComponent;
  let fixture: ComponentFixture<TransferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
