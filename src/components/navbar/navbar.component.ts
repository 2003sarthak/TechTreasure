import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { NgIf } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username: string = '';

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe((user: User | null) => {
      this.username = user ? user.username : '';
    });
  }

  toggleNav(): void {
    const navLinks = document.querySelector('.nav-links');
    navLinks?.classList.toggle('show');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
