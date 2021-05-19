import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {

  userList = [];
  currentIndex = -1;
  userDetailFrom: FormGroup;
  submitted = false;
  firstName = '';
  maxDate = new Date();
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('UserList') != '') {
      this.userList = JSON.parse(localStorage.getItem('UserList'));
    }

    this.route.params.subscribe(params => {
      let index = -1;
      if (params.id != '-1') {
        index = this.userList.findIndex(x => x.firstName == params['id']);
      }

      if (index != -1) {
        this.currentIndex = index;
        let user = this.userList[index];
        this.userDetailFrom = this.formBuilder.group({
          firstName: [user.firstName, Validators.required],
          lastName: [user.lastName, Validators.required],
          email: [user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}')]],
          phone: [user.phone, [Validators.required, Validators.pattern('^[-\s\./0-9]{10}$')]],
          status: [user.status, Validators.required],
          DOB: [user.DateOfBirth, Validators.required],
          password: [user.Passowrd, [Validators.required,
          Validators.pattern('^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*')]],
          confirmPassword: [user.Passowrd, Validators.required],
          country: [user.Address.country, Validators.required],
          state: [user.Address.state, Validators.required],
          city: [user.Address.city, Validators.required]
        }, { validator: this.passwordConfirming });
      } else {
        this.userDetailFrom = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}')]],
          phone: ['', [Validators.required, Validators.pattern('^[-\s\./0-9]{10}$')]],
          status: ['', Validators.required],
          DOB: ['', Validators.required],
          password: ['', [Validators.required,
          Validators.pattern('^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*')]],
          confirmPassword: ['', Validators.required],
          country: ['', Validators.required],
          state: ['', Validators.required],
          city: ['', Validators.required]
        }, { validator: this.passwordConfirming });
      }
    });
  }



  get f() { return this.userDetailFrom.controls; }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('confirmPassword').value == null || c.get('confirmPassword').value == "") {
      return null;
    }
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    } else {
      return null;
    }
  }

  resetForm() {
    this.submitted = false;
    this.userDetailFrom = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}')]],
      phone: ['', [Validators.required, Validators.pattern('^[-\s\./0-9]{10}$')]],
      status: ['', Validators.required],
      DOB: ['', Validators.required],
      password: ['', [Validators.required,
      Validators.pattern('^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*')]],
      confirmPassword: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    }, { validator: this.passwordConfirming });
  }


  onDataSubmit() {
    this.submitted = true;

    console.log(this.userDetailFrom);
    if (this.userDetailFrom.invalid) {
      return;
    }

    let user = {
      firstName: this.userDetailFrom.value['firstName'],
      lastName: this.userDetailFrom.value['lastName'],
      email: this.userDetailFrom.value['email'],
      phone: this.userDetailFrom.value['phone'],
      status: this.userDetailFrom.value['status'],
      DateOfBirth: this.userDetailFrom.value['DOB'],
      Passowrd: this.userDetailFrom.value['password'],
      Address: {
        country: this.userDetailFrom.value['country'],
        state: this.userDetailFrom.value['state'],
        city: this.userDetailFrom.value['city']
      }
    };
    if (this.currentIndex != -1) {
      this.userList[this.currentIndex] = user;
      alert("User Edited Successfully.");
    } else {
      this.userList.push(user);
      alert("User Added Successfully.");
    }
    localStorage.setItem('UserList', JSON.stringify(this.userList));
    this.resetForm();
  }
}