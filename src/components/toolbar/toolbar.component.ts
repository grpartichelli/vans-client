import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(private readonly router: Router) {}

  public get isLogin(): boolean {
    return this.router.url === '/login';
  }
}
