import { Component, OnInit } from '@angular/core';
import { ProjectionService } from 'src/app/services/projection.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projections',
  templateUrl: './projections.component.html',
  styleUrls: ['./projections.component.css']
})
export class ProjectionsComponent implements OnInit {

  listOfData = [];
  isCustomer: boolean;
  isManager: boolean;
  isAdmin: boolean;
  cinemasManager: boolean;

  constructor(private projectionService: ProjectionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cinemasManager = false;
    if(this.route.snapshot.params.id != null){
      this.projectionService.getAllProjectionsByMovie(this.route.snapshot.params.id).subscribe(data => {
        this.listOfData = data;
      });
    }else{
      this.projectionService.getAllProjectionsByCinema(JSON.parse(localStorage.getItem('cinemaId'))).subscribe(data => {
        this.listOfData = data;
      })
      const u = JSON.parse(localStorage.getItem('user'));
      if(u.userType === 'MANAGER'){
        this.cinemasManager = true;
      }
    }
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
  }

  reserve(id): void{
    const user = JSON.parse(localStorage.getItem('user'));
    const body = {
      projectionId: id,
      customerId: user.id
    }
    this.projectionService.reserve(body).subscribe(() => {

    });
  }

  delete(id): void{
    this.projectionService.deleteProjection(id).subscribe(() => {
      if(this.route.snapshot.params.id != null){
        this.projectionService.getAllProjectionsByMovie(this.route.snapshot.params.id).subscribe(data => {
          this.listOfData = data;
        });
      }else{
        this.projectionService.getAllProjectionsByCinema(JSON.parse(localStorage.getItem('cinemaId'))).subscribe(data => {
          this.listOfData = data;
        })
        const u = JSON.parse(localStorage.getItem('user'));
        if(u.userType === 'MANAGER'){
          this.cinemasManager = true;
        }
      }
    })
  }

  update(id): void{
    this.router.navigateByUrl(`layout/projection/${id}`);
  }

  dateAndTime(date, time): String{
    var newDate = date.toString().replace(/,/g, '-');
    var newTime = time.toString().replace(/,/g, ':');
    return newDate + ' ' + newTime;
  }
}
