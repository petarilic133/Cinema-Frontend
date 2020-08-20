import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  listOfData = [];
  isSetNewManager: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private managerService: ManagerService, private authService: AuthService, private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.managerService.getAllManagers().subscribe(data => {
      this.listOfData = data;
    })
    this.isSetNewManager = false;
    if(this.route.snapshot.params.id != undefined){
      this.isSetNewManager = true;
    }
  }

  delete(id): void{
    this.authService.deleteUser(id).subscribe(data => {
      if(this.route.snapshot.params.id === undefined){
        this.managerService.getAllManagers().subscribe(data => {
          this.listOfData = data;
        })
      }
    })
  }

  setNewManager(id): void{
    const body = {
      managerId: id,
      cinemaId: this.route.snapshot.params.id
    }
    this.cinemaService.setNewManager(body).subscribe(() => {
      this.router.navigateByUrl('layout/cinemas');
    })
  }

  newManager(): void{
    this.router.navigateByUrl('layout/register');
  }
}
