import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SecurityHeaders {

  public get() {
    return {'userId': 'my_user', 'password': 'test'}
  }
}
