import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-subnavbar',
  imports: [RouterLink,FormsModule],
  templateUrl: './subnavbar.component.html',
  styleUrl: './subnavbar.component.css'
})
export class SubnavbarComponent {
  searchQuery: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  searchProducts(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/product', 'all'], { queryParams: { query: this.searchQuery } });
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleSubNav(): void {
    const subNavLinks = document.querySelector('.sub-nav-links');
    subNavLinks?.classList.toggle('show');
  }
}
