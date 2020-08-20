import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  listOfData = [];

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getAllCustomers().subscribe(data => {
      this.listOfData = data;
    })
  }

  block(id): void{
    this.authService.deleteUser(id).subscribe(() => {
      this.userService.getAllCustomers().subscribe(data => {
        this.listOfData = data;
      })
    })
  }
}
