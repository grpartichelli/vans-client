import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from "../../service/login.service";
import {User} from "../../models/user.model";

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

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}

  public onSubmit(): void {
    if (this.isRegistration) {
      this.register();
    } else {
      this.login()
    }
  }

  public register(): void {
    this.loginService.register(new User(this.username, this.password))
      .then(() => {
        this.registrationValid = true;
        this.router.navigate(['students']).then();
      })
      .catch(() => {
          this.registrationValid = false;
        }
      )
  }

  public login(): void {
    this.loginService.login(new User(this.username, this.password))
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
