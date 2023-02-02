
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LocalStorageService} from "../service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, public localStorageService: LocalStorageService) {}

  public canActivate(): boolean {
    if (this.localStorageService.getData("user")) {
      return true;
    }
    this.router.navigate(['login']).then()
    return false;
  }
}
