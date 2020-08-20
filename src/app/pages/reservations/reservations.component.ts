import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectionService } from 'src/app/services/projection.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  listOfData = [];

  constructor(private router: Router, private route: ActivatedRoute, private projectionService: ProjectionService) { }

  ngOnInit(): void {
    // const user = JSON.parse(localStorage.getItem('user'));
    this.projectionService.getAllProjectionsByCustomer(this.route.snapshot.params.id).subscribe(data => {
      this.listOfData = data;
    })
  }

  cancel(id): void {
    const body = {
      projectionId: id,
      customerId: this.route.snapshot.params.id
    }
    this.projectionService.cancelReservation(body).subscribe(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      this.projectionService.getAllProjectionsByCustomer(user.id).subscribe(data => {
        this.listOfData = data;
      })
    })
  }

  dateAndTime(date, time): String{
    var newDate = date.toString().replace(/,/g, '-');
    var newTime = time.toString().replace(/,/g, ':');
    return newDate + ' ' + newTime;
  }
}
