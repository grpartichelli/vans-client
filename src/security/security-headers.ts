import {Injectable} from "@angular/core";
import {LocalStorageService} from "../service/local-storage.service";
import {UserModel} from "../models/user.model";

@Injectable({providedIn: 'root'})
export class SecurityHeaders {

  constructor(private readonly localStorageService: LocalStorageService) {
  }

  public get(): any {
    const user = this.localStorageService.getData<UserModel>("user");

    return {
      headers: {
        username: user?.username ?? '',
        password: user?.password ?? ''
      }
    }
  }
}
