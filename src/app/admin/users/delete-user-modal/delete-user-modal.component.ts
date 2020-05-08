import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {

  @Input() user;
  errorMessage: string = '';

  constructor(public activeModal:NgbActiveModal, private userService: UsersService) { }

  ngOnInit() {
  }

  performDelete() {
    this.userService.deleteUser(this.user._id).subscribe(
      () => {
        this.activeModal.close();
      },
      () => {
        this.errorMessage = "Failed to delete user";
      }
    );
  }

}