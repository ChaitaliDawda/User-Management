import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userList:any = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('UserList') == undefined) {
      localStorage.setItem('UserList', JSON.stringify([]));
    }

    if (localStorage.getItem('UserList') != '' && localStorage.getItem('UserList') != null) {
      let data: any;
      data = localStorage.getItem('UserList');
      this.userList = JSON.parse(data);
    }
  }

  OnActionDelete(index: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.userList.splice(index, 1);
      localStorage.setItem('UserList', JSON.stringify(this.userList));
      alert("User is deleted.");
    }
  }
}
