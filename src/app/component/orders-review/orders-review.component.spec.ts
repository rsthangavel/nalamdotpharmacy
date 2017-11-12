import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReviewComponent } from './orders-review.component';

describe('OrdersReviewComponent', () => {
  let component: OrdersReviewComponent;
  let fixture: ComponentFixture<OrdersReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
