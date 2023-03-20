import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User, UserComplete } from '../user';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css']
})
export class UsersRegisterComponent {
  user : UserComplete | undefined;
  btnText: string = 'Save'
  id: number | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {
  }
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  ngOnInit(): void {
    this.getUser();
  }

  

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id !== undefined) {
      this.userService.getUser(id)
        .subscribe(user => {
          this.id = id
          this.btnText = 'Update'
          this.userForm.patchValue(user)
          console.log(user)
        });
    }
  }
  

  save() {
    if (this.id !== undefined) {
      
    } else {
      this.userService.saveUser(this.userForm.value).subscribe(data => this.user = data as UserComplete);
    }
  }
  reset() {
    console.log('teste')
  }
}
