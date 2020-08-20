import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit {

  listOfData = [];
  isAdmin: boolean;
  isCustomer: boolean;
  isManager: boolean;

  constructor(private router: Router, private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.isAdmin = false;
    this.isCustomer = false;
    this.isManager = false;
    const user = JSON.parse(localStorage.getItem('user'));
    if(user != null){
      if(user.userType === 'CUSTOMER'){
        this.isCustomer = true;
      }else if(user.userType === 'ADMIN'){
        this.isAdmin = true;
      }else{
        this.isManager = true;
      }
    }
    if(!this.isManager){
      this.cinemaService.getAllCinemas().subscribe(data => {
        this.listOfData = data;
      })
    }else{
      this.cinemaService.getAllCinemasByManager(user.id).subscribe(data => {
        this.listOfData = data;
      })
    }
  }

  delete(id): void{
    this.cinemaService.deleteCinema(id).subscribe(() => {
      this.cinemaService.getAllCinemas().subscribe(data => {
        this.listOfData = data;
      })
    })
  }

  update(id): void{
    this.router.navigateByUrl(`layout/cinema/${id}`);
  }

  newCinema(): void{
    this.router.navigateByUrl(`layout/cinema`);
  }

  halls(id): void{
    this.router.navigateByUrl(`layout/halls/${id}/cinema`);
  }

  setNewManager(id): void{
    this.router.navigateByUrl(`layout/managers/${id}/cinema`)
  }

  projections(id): void{
    localStorage.setItem('cinemaId', JSON.stringify(id));
    this.router.navigateByUrl(`layout/projections`)
  }
}
