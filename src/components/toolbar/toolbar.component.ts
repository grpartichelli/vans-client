import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorageService} from "../../service/local-storage.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(private readonly router: Router, private readonly localStorageService: LocalStorageService) {}

  public get isLogin(): boolean {
    return this.router.url === '/login';
  }

  public logout(): void {
      this.router.navigate(['/login'])
        .then(() => this.localStorageService.removeData("user"))
  }

  public refresh(): void {
    if (this.isLogin) {
      window.location.reload();
    } else {
      this.router.navigate(['/']).then()
    }
  }
}
