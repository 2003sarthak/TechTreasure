import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-home',
  imports: [NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Product[] = [];
  trendingProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.products = this.productService.getProducts();
        this.trendingProducts = this.getRandomProducts(this.products, 12);
      }
    });
  }

  getRandomProducts(products: Product[], count: number): Product[] {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  addToCart(product: Product): void {
    if (product.quantity === 0) {
      alert('This item is currently out of stock.');
      return;
    }
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Item added to cart successfully!');
  }

  addToWishlist(product: Product): void {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    wishlistItems.push(product);
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    alert('Item added to wishlist successfully!');
  }

  viewProduct(): void {
    this.router.navigate(['/productDesc']);
  }
}
