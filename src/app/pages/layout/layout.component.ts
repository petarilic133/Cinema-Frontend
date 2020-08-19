import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  someoneSignedId: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.someoneSignedId = false;
    if(JSON.parse(localStorage.getItem('user')) != undefined){
      this.someoneSignedId = true;
    }
  }

  clearStorage(): void{
    localStorage.clear();
    this.router.navigateByUrl('layout/login');
    window.location.reload();
  }

}
