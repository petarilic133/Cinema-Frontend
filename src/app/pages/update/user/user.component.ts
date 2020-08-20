import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  validateForm: FormGroup;
  un = null;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [{value: null, disabled: true}, [Validators.required, Validators.email]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      username: [{value: null, disabled: true}, [Validators.required]],
      phone: [null, [Validators.required]],
      dateOfBirth: [{value: null, disabled: true}, [Validators.required]],
    });
    const user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUser(user.id).subscribe(data =>{
      const formValues = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        username: data.username,
        dateOfBirth: data.dateOfBirth,
      }
      this.un = data.username;
      this.validateForm.setValue(formValues);
    })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const body = {
      ...this.validateForm.value,
      username: this.un
    }
    this.userService.updateUser(body).subscribe(() => {
      this.router.navigateByUrl('layout/movies');
    })
  }
}
