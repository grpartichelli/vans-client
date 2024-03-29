import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ExampleService} from "../service/example.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly router: Router) {
  }

  public get isLogin(): boolean {
    return this.router.url === '/login';
  }

}
