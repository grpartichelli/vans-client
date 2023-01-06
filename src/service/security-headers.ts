import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SecurityHeaders {

  public get() {
    return {'username': 'test_user', 'password': 'test_password'}
  }
}
