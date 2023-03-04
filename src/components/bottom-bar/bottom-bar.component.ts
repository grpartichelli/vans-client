import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBar {


  constructor(private readonly router: Router) {
  }

  public get isStudentsRoute(): boolean {
    return this.router.url === "/students";
  }

  public get isRoutesRoute(): boolean {
    return this.router.url === "/routes"
  }

  public goToStudents(): void {
    this.router.navigate(['students']).then()
  }

  public goToRoutes(): void {
    this.router.navigate(['routes']).then()
  }
}
