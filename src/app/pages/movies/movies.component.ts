import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  listOfData = [];

  constructor(private router: Router, private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe(data => {
      this.listOfData = data;
    })
  }

  projections(id): void{
    this.router.navigateByUrl(`layout/projections/${id}/movie`);
  }
}
