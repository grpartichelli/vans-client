import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../service/user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({providedIn: 'root'})
export class LoginComponent {
  public loginValid = true;
  public registrationValid = true;
  public isRegistration = false
  public username = '';
  public password = '';
  public loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
  }

  public onSubmit(): void {
    if (this.isRegistration) {
      this.register();
    } else {
      this.login()
    }
  }

  public register(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.userService.register(new UserModel(this.username, this.password))
      .then(() => {
        console.log("what")
        this.registrationValid = true;
        this.router.navigate(['students']).then();
        this.loading = false;
      })
      .catch(() => {
          console.log("what2")
          this.registrationValid = false;
          this.loading = false
        }
      )
  }

  public login(): void {
    this.userService.login(new UserModel(this.username, this.password))
      .then(() => {
        this.router.navigate(['students']).then();
        this.loginValid = true
      })
      .catch(() => {
          this.loginValid = false
        }
      )
  }

  public setIsRegistration(isRegistration: boolean): void {
    if (isRegistration) {
      this.loginValid = true;
    } else {
      this.registrationValid = true;
    }
    this.isRegistration = isRegistration;
  }
}
