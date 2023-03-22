import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../service/user.service";
import {UserModel} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public user: UserModel | null = null;
  public isEditingName = false;
  public isEditingCapacity = false;


  constructor(public dialog: MatDialog, public userService: UserService,) {
    this.loadUser();
  }

  public loadUser(): void {
      this.userService.current()
        .then((user) => this.user = user)
  }

  public update(): void {
    this.userService.update(this.user ?? new UserModel("", ""))
      .then(() => {
        this.isEditingCapacity = false;
        this.isEditingName = false;
        this.loadUser()
      })
  }

}
