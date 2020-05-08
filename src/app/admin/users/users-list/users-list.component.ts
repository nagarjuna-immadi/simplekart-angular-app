import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { IPaginatedUsers } from '../../../interfaces/paginated-users.interface';
import { IUser } from '../../../interfaces/user.interface';
import { IPaginationSettings } from '../../../interfaces/pagination-settings.interface';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';
import { ViewUserModalComponent } from '../view-user-modal/view-user-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  
  constructor(private usersService: UsersService, 
              private modalService: NgbModal, 
              private route: ActivatedRoute,
              private titleService: Title) { }

  totalItems: number = 0;
  users: IUser[];
  paginationSettings:IPaginationSettings = {
    page: 1,
    perPage: 10,
    sortBy: 'firstName',
    sortType: 'asc', // 'desc'
    searchTerm: ''
  };
  successMessage: string = '';

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    });

    this.loadUsers();  
  }

  loadUsers() {
    this.usersService.getUsers(this.paginationSettings).subscribe(
      (data: IPaginatedUsers)  => {
        this.totalItems = data.totalItems;
        this.users = data.data
      }
    );
  }

  pageChange() {
    this.loadUsers();
  }

  pageSizeChange() {
    this.paginationSettings.page = 1;
    this.loadUsers();
  }

  search() {
    this.paginationSettings.page = 1;
    this.loadUsers();
  }

  sort(column) {
    if(this.paginationSettings.sortBy === column) {
      this.paginationSettings.sortType = this.paginationSettings.sortType === 'asc' ? 'desc' : 'asc';
    } else {
      this.paginationSettings.sortBy = column;  
      this.paginationSettings.sortType = 'asc';  
    }
    this.loadUsers();
  }

  getSortIconClass() {
    return this.paginationSettings.sortType === 'asc' ? 'fa-sort-alpha-down' : 'fa-sort-alpha-up';
  }

  confirmDelete(user) {
    console.log(user);
    let deleteModalReference = this.modalService.open(DeleteUserModalComponent, {
      backdrop: 'static',
      keyboard: false,
      windowClass: 'delete-modal'
    });

    deleteModalReference.componentInstance.user = user;
    deleteModalReference.result.then((result) => {
      this.loadUsers();
      this.successMessage = 'User deleted successfully';
    }, (reason) => {
      console.log('Modal dismissed');
    });
  }

  viewUserDetails(user) {
    console.log(user);
    let viewUserModalReference = this.modalService.open(ViewUserModalComponent, {
      windowClass: 'user-details-modal'
    });

    viewUserModalReference.componentInstance.user = user;
    
  }

}
