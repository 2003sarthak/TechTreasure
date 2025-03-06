import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../models/product';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let authService: AuthServiceService;
  let router: Router;

  beforeEach(async () => {
    const authServiceMock = {
      loggedInUser$: of(true)
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [CartComponent], // Add CartComponent to imports array
      providers: [
        { provide: AuthServiceService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthServiceService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // first test case
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // second test case
  it('should display empty cart message on initial load', () => {
    component.cartItems = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.empty-cart p').textContent).toContain('Your cart is empty.');
  });

  
  //third test case
  // it('should proceed to checkout', () => {
  //   spyOn(window, 'alert');
  //   component.checkout();
  //   expect(window.alert).toHaveBeenCalledWith('Proceeding to checkout!');
  // });
  // it('should proceed to checkout', () => {
  //   component.checkout();
  //   expect(component.message).toBe('Proceeding to checkout!');
  // });


  // fourth test case
  it('should redirect to login if user is not logged in', () => {
    authService.loggedInUser$ = of(null);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not allow item quantity to go negative', () => {
    const mockItems: Product[] = [{
      name: 'Product 1', price: 100, quantity: 1, shortDescription: 'Description 1', category: 'Category 1',
      image: ''
    }];
    component.cartItems = mockItems;
    fixture.detectChanges();
  
    
    component.decreaseQuantity(0);
    fixture.detectChanges();
  
    // checking if item is removed
    expect(component.cartItems.length).toBe(0);
  });
});
