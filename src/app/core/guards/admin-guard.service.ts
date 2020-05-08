import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate, CanLoad {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate() {
    let isAdmin = this.authService.isAdmin();
    if(isAdmin) {
      return true;
    }
    
    this.router.navigate(['/home']);
    return false;
  }

  canLoad(): boolean {
    return this.canActivate();
  }
}
