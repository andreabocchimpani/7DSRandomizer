import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public now: Date;
  public isNight: boolean;

  constructor(private breakpointObserver: BreakpointObserver) { 
    this.isNight = false;
  }

  ngOnInit(): void {
    this.now = new Date();
    this.isNight = this.now.getHours() > 18 ||  this.now.getHours() < 7? true : false;
    // this.isNight = this.now.getHours() > 18? true : false;
  }

}
