import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isAdmin: boolean;
  isCustomer: boolean;
  isManager: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setupUserType();
  }

  private setupUserType(): void{
    this.isAdmin = false;
    this.isCustomer = false;
    this.isManager = false;
    const user = JSON.parse(localStorage.getItem('user'));
    if(user != null){
      if(user.userType === 'ADMIN'){
        this.isAdmin = true;
      }else if(user.userType === 'CUSTOMER'){
        this.isCustomer = true;
      }else{
        this.isManager = true;
      }
    }
  }

  updateProfile(): void{
    this.router.navigateByUrl(`layout/user`);
  }

  reservations(): void{
    const user = JSON.parse(localStorage.getItem('user'));
    this.router.navigateByUrl(`layout/reservations/${user.id}/customer`);
  }

  pastProjections(): void{
    const user = JSON.parse(localStorage.getItem('user'));
    this.router.navigateByUrl(`layout/history/${user.id}/customer`);
  }

  clearStorage(): void{
    localStorage.clear();
    this.router.navigateByUrl('layout/login');
    this.setupUserType();
  }
}
