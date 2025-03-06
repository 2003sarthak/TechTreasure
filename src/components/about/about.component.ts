import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }
}
