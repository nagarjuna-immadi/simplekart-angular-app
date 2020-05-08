import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginModalComponent } from '../../authentication/login-modal/login-modal.component';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private modalService: NgbModal, private authService: AuthenticationService, private router: Router) { }

  isLoggedIn: Boolean;
  isAdmin: Boolean;
  currentUser: any;

  ngOnInit() {
    this.authService.authentication$.subscribe(
      data => {
        this.isLoggedIn = data.isLoggedIn;
        this.isAdmin = data.isAdmin;
        this.currentUser = data.currentUser;
      }
    );
  }

  openLoginModal() {
    this.modalService.open(LoginModalComponent, {
      backdrop: 'static',
      keyboard: false,
      windowClass: 'simple-modal login-modal'
    });
  }

  logout() {
    this.authService.logout();
  }

}
