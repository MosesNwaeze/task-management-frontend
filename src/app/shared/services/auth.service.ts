import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  getAuthToken(): string {
    return localStorage.getItem("token") as string;

  }

  setAuthToken(token: string): void {
    localStorage.setItem('token', token);
  }

  deleteAuthToken(key: string): void {
    localStorage.removeItem(key)
  }

  getRole(): string {
    return localStorage.getItem('role') as string;
  }

  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  getUserId(): string {
    return localStorage.getItem('userId') as string;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth/login']).then()
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}
