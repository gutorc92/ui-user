import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Log } from '../log';
import { LogService } from '../log.service';

@Component({
  selector: 'app-logs-detail',
  templateUrl: './logs-detail.component.html',
  styleUrls: ['./logs-detail.component.css']
})
export class LogsDetailComponent {
  log: Log | undefined;
  JSON: any;

  constructor(
    private route: ActivatedRoute,
    private logService: LogService,
    private location: Location,
    private router: Router
  ) {
    this.JSON = JSON;
  }

  ngOnInit(): void {
    this.getLog();
  }

  

  getLog(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.logService.getUser(id)
      .subscribe(log => this.log = log);
  }

  goBack(): void {
    this.location.back();
  }

  goEdit(id: number) {
    this.router.navigateByUrl(`/users/edit/${id}`)
    console.log('id', id)
  }
}
