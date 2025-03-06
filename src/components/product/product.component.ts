import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-product',
  imports: [NgFor],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products: Product[] = [];
  category: string = 'all';
  searchQuery: string = '';

  constructor(
    private productService: ProductService,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.route.params.subscribe(params => {
          this.category = params['category'] || 'all';
          this.route.queryParams.subscribe(queryParams => {
            this.searchQuery = queryParams['query'] || '';
            this.loadProducts();
          });
        });
      }
    });
  }

  loadProducts(): void {
    if (this.searchQuery) {
      this.products = this.productService.searchProducts(this.searchQuery);
    } else {
      this.products = this.productService.getProducts(this.category);
    }
  }

  searchProducts(): void {
    this.router.navigate(['/product', 'all'], { queryParams: { query: this.searchQuery } });
  }

  addToCart(product: Product): void {
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
