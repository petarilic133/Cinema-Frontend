import { Component, OnInit } from '@angular/core';
import { ProjectionService } from 'src/app/services/projection.service';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit {
  
  listOfData = [];

  constructor(private projectionService: ProjectionService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.projectionService.getAllPastProjectionsByCustomer(user.id).subscribe(data => {
      this.listOfData = data;
    })
  }

}
