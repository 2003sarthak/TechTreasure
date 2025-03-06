import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-wishlist',
  imports: [NgFor,NgIf],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishlistItems: Product[] = [];

  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.loadWishlistItems();
      }
    });
  }

  loadWishlistItems(): void {
    this.wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
  }

  removeFromWishlist(index: number): void {
    this.wishlistItems.splice(index, 1);
    localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItems));
    alert('Item removed from wishlist successfully!');
  }

  addToCart(index: number): void {
    const cartItems: Product[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const item = this.wishlistItems[index];
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);
    
    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      item.quantity = 1; 
      cartItems.push(item);
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.removeFromWishlist(index);
    alert('Item added to cart!');
  }
}
