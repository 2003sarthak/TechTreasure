import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-cart',
  imports: [NgFor,NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  totalCost = 0;

  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.loadCartItems();
        this.calculateTotalCost();
      }
    });
  }

  loadCartItems(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  calculateTotalCost(): void {
    this.totalCost = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity += 1;
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.calculateTotalCost();
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
    } else {
      this.cartItems.splice(index, 1);
      alert('Item removed from cart successfully!');
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.calculateTotalCost();
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.calculateTotalCost();
    alert('Item removed from cart successfully!');
  }

  checkout(): void {
    alert('Proceeding to checkout!');
  }

}
