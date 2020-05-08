import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'simplekart';

  constructor(private router: Router) {}

  ngOnInit() {

    this.router.events.subscribe((event: RouterEvent) => {
      // console.log(event);
    });

  }
}
