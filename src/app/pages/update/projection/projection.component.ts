import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectionService } from 'src/app/services/projection.service';
import { HallService } from 'src/app/services/hall.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.css']
})
export class ProjectionComponent implements OnInit {

  listOfData1 = [];
  listOfData2 = [];
  movieId = null;
  hallId = null;
  price = null;
  date = null;
  time = null;

  constructor(private router: Router, private route: ActivatedRoute, private projectionService: ProjectionService, private hallService: HallService, private movieService: MovieService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.movieService.getAllMovies().subscribe(data => {
      this.listOfData1 = data;
    });
    this.hallService.getAllHallsByManager(user.id).subscribe(data => {
      this.listOfData2 = data;
    });
    if(this.route.snapshot.params.id !== undefined){
      this.projectionService.getProjection(this.route.snapshot.params.id).subscribe(data => {
        this.price = data.price;
        this.date = data.date.toString().replace(/,/g, '-');
        this.time = data.time.toString().replace(/,/g, ':');
        this.movieId = data.movieId;
        this.hallId = data.hallId;
      })
    }
  }

  confirm(): void{
    if(this.route.snapshot.params.id === undefined){
      const body = {
        movieId: this.movieId,
        hallId: this.hallId,
        price: this.price,
        date: this.date,
        time: this.time
      }
      this.projectionService.createProjection(body).subscribe(() => {
        this.router.navigateByUrl('layout/cinemas')
      })
    }else{
      const body = {
        movieId: this.movieId,
        hallId: this.hallId,
        price: this.price,
        date: this.date,
        time: this.time,
        projectionId: this.route.snapshot.params.id
      }
      this.projectionService.updateProjection(body).subscribe(() => {
        this.router.navigateByUrl('layout/cinemas')
      })
    }
    
  }

  hallMarkAndCinemaName(mark, cinemaName): String{
    return mark + ' ' + cinemaName;
  }
}
