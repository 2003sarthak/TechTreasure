import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  private loggedInUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('loggedInUser') || 'null'));
  public loggedInUser$ = this.loggedInUserSubject.asObservable();

  signup(user: User): boolean {
    if (this.users.find(u => u.email === user.email)) {
      return false; 
    }
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.loggedInUserSubject.next(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedInUserSubject.next(null);
    localStorage.removeItem('loggedInUser');
  }

  isAuthenticated(): boolean {
    return this.loggedInUserSubject.value !== null;
  }
}
