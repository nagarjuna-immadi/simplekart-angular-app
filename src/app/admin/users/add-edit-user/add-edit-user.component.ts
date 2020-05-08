import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../interfaces/user.interface';
import { IState } from '../../../interfaces/state.interface';
import { ICity } from '../../../interfaces/city.interface';
import { UsersService } from '../../../core/services/users.service';
import { AddressService } from '../../../core/services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  isEdit: boolean;
  userForm: FormGroup;
  states: IState[];
  isFormLoading: boolean = false;
  errorMessage: string = '';
  userId: string;
  user: IUser;
  cityElementsData: any[] = [];

  constructor(private userService: UsersService, 
              private addressService: AddressService, 
              private activatedRoute: ActivatedRoute, 
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.userId = params.get('userId');
        if(this.userId === '0' || !this.userId) {
          this.isEdit = false;
        } else {
          this.isEdit = true;
        }
      }
    );

    this.activatedRoute.data.subscribe(
      (data) => {
        this.states = data.states;
      }
    );

    this.userForm = this.fb.group({
      email: [{value: '', disabled: this.isEdit}, [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['Male'],
      isActive: [true],
      addresses: this.fb.array([])
    });

    this.userForm.valueChanges.subscribe(
      values => { 
        console.log(values);
      }
    );

    if(this.isEdit) {
      this.isFormLoading = true;
      this.userService.getUser(this.userId).subscribe(
        (user: IUser)=> {
          console.log(user);
          this.user = user;
          this.isFormLoading = false;
          if(this.user.addresses.length) {
            this.user.addresses.forEach((address, index) => {
              this.addAddress();
              this.loadCities(index, address.state._id);
            });
          }
          console.log(this.user);
          let userObj = this.formatUser(this.user);
          this.userForm.patchValue(userObj);
        },
        error => {
          this.errorMessage = 'Failed to load user data';
          this.isFormLoading = false;
        }
      );
    }
      
  }

  formatUser(user) {
    let userObj = {...user};
    if(userObj.addresses.length) {
      userObj.addresses.forEach((address, i) => {
        address.state = address.state._id;
        address.city = address.city._id;
      });
    }

    return userObj;
  }

  get email() { return this.userForm.get('email'); }
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get gender() { return this.userForm.get('gender'); }
  get isActive() { return this.userForm.get('isActive'); }
  get addresses() { return this.userForm.get('addresses') as FormArray; }

  saveUser() {
    console.log(this.userForm.value);
    let payload = this.userForm.value;
    if(this.isEdit) {
      payload.email = this.user.email;
      this.userService.updateUser(this.user._id, payload)
      .subscribe(data => {
        if(data && data.message){
          this.router.navigate(['/admin/users']);
        } else if(data && data.error){
          this.errorMessage = `Failed to update user. ${data.error}`;
        }
      },
      error => {
        this.errorMessage = error.error ? error.error.error : error.message;
      });
    } else {
      this.userService.addUser(payload)
      .subscribe(data => {
        if(data && data.message){
          this.router.navigate(['/admin/users']);
        } else if(data && data.error){
          this.errorMessage = `Failed to create account. ${data.error}`;
        }
      },
      error => {
        this.errorMessage = error.error ? error.error.error : error.message;
      });
    }
  }

  cancle(event) {
    event.preventDefault();
    this.router.navigate(['/admin/users']);
  }

  loadCities(addressIndex, stateId): void {
    let addressGroup = this.addresses.at(addressIndex) as FormGroup;
    let cityControl = addressGroup.get('city');
    cityControl.setValue('');

    this.cityElementsData[addressIndex].isLoading = true;
    this.addressService.getCities(stateId)
      .subscribe(data => {
        this.cityElementsData[addressIndex].cities = data;
      },
      error => {
        this.errorMessage = 'Failed to load cities';
        this.cityElementsData[addressIndex].isLoading = false;
      },
      () => {
        this.cityElementsData[addressIndex].isLoading = false;
      });
  }

  addAddress(event?: Event) {
    if(event) event.preventDefault();
    
    let addressGroup = this.fb.group({
      type: ['Home'],
      street1: ['', Validators.required],
      street2: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]]
    });

    this.addresses.push(addressGroup);

    this.cityElementsData.push({
      cities: [],
      isLoading: false
    });
  }

  deleteAddress(addressIndex) {
    this.addresses.removeAt(addressIndex);
    this.cityElementsData.splice(addressIndex, 1);
  }

}
