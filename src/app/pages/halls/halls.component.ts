import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HallService } from 'src/app/services/hall.service';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.css']
})
export class HallsComponent implements OnInit {

  listOfData = [];
  isManager: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private hallService: HallService) { }

  ngOnInit(): void {
    this.hallService.getAllHallsByCinema(this.route.snapshot.params.id).subscribe(data => {
      this.listOfData = data;
    })
    const user = JSON.parse(localStorage.getItem('user'));
    this.isManager = false;
    if(user != null && user.userType === 'MANAGER'){
      this.isManager = true;
    }
  }

  newHall(): void{
    localStorage.setItem('cinemaId', JSON.stringify(this.route.snapshot.params.id));
    this.router.navigateByUrl('layout/hall');
  }

  update(id): void{
    localStorage.setItem('cinemaId', JSON.stringify(this.route.snapshot.params.id));
    this.router.navigateByUrl(`layout/hall/${id}`);
  }

  delete(id): void{
    this.hallService.deleteHall(id).subscribe(() => {
      this.hallService.getAllHallsByCinema(this.route.snapshot.params.id).subscribe(data => {
        this.listOfData = data;
      })
    })
  }
}
