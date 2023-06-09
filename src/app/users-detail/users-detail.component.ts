import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';
@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

  goEdit(id: number) {
    this.router.navigateByUrl(`/users/edit/${id}`)
    console.log('id', id)
  }
}
