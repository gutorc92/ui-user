import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App User';

  constructor(private router: Router) {}

  listClick() {
    this.router.navigateByUrl(`/users`)
  }

  listLogsClick() {
    this.router.navigateByUrl(`/logs`)
  }

  createClick() {
    this.router.navigateByUrl(`/users/create`)
  }
}
