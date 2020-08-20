import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HallService } from 'src/app/services/hall.service';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit {

  validateForm: FormGroup;
  isUpdate: boolean;
  id = null

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private hallService: HallService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      mark: [null, [Validators.required]],
      capacity: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
    this.id = JSON.parse(localStorage.getItem('cinemaId'));
    if(this.route.snapshot.params.id != undefined){
      this.isUpdate = true;
      this.hallService.getHall(this.route.snapshot.params.id).subscribe(data =>{
        const formValues = {
          mark: data.mark,
          capacity: data.capacity
        }
        this.validateForm.setValue(formValues);
      })
    }else{
      this.isUpdate = false;
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if(this.route.snapshot.params.id != undefined){
      const body = {
        ...this.validateForm.value,
        hallId: this.route.snapshot.params.id
      }
      this.hallService.updateHall(body).subscribe(()=> {
        this.router.navigateByUrl(`layout/halls/${this.id}/cinema`);
      })
    }else{
      const body = {
        ...this.validateForm.value,
        cinemaId: this.id
      }
      this.hallService.createHall(body).subscribe(()=> {
        this.router.navigateByUrl(`layout/halls/${this.id}/cinema`);
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
