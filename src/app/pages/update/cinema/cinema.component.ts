import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CinemaService } from 'src/app/services/cinema.service';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  listOfData = [];

  validateForm: FormGroup;
  isUpdate: boolean;
  managerId = null;

  constructor(private fb: FormBuilder, private router: Router, private cinemaService: CinemaService, private route: ActivatedRoute, private managerService: ManagerService) { }

  ngOnInit(): void {
    var temp = false;
    if(this.route.snapshot.params.id != undefined){
      temp = true;
    }
    this.validateForm = this.fb.group({
      name: [{value: null, disabled: temp}, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
    });

    if(this.route.snapshot.params.id != undefined){
      this.isUpdate = true;
      this.cinemaService.getCinema(this.route.snapshot.params.id).subscribe(data =>{
        const formValues = {
          name: data.name,
          address: data.address,
          phone: data.phone,
          email: data.email,
        }
        this.validateForm.setValue(formValues);
      })
    }else{
      this.isUpdate = false;
    }
    this.setupManagers();
  }

  private setupManagers(): void{
    this.managerService.getAllManagers().subscribe(data => {
      this.listOfData = data;
    })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if(this.route.snapshot.params.id != undefined){
      this.cinemaService.updateCinema(this.validateForm.value).subscribe(() => {
        this.router.navigateByUrl('layout/cinemas');
      })
    }else{
      const body = {
        ...this.validateForm.value,
        managerId: this.managerId
      }
      console.log(body);
      
      this.cinemaService.createCinema(body).subscribe(() => {
        this.router.navigateByUrl('layout/cinemas');
      })
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.rePassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
}
