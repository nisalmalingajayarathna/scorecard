import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-summery',
  templateUrl: './home-summery.component.html',
  styleUrls: ['./home-summery.component.scss']
})
export class HomeSummeryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
