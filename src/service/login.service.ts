import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {User} from "../models/user.model";

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(private readonly httpClient: HttpClient, private readonly localStorageService: LocalStorageService) {}

  // mock implementation
  public login(user: User): Promise<any> {
    let users = this.localStorageService.getData<Array<User>>("users") ?? [];

    if (!users.some(it => it.username === user.username && it.password === user.password)) {
      return Promise.reject();
    }

    this.localStorageService.saveData("user", user);
    return Promise.resolve();
  }

  public register(user: User): Promise<any> {
    let users = this.localStorageService.getData<Array<User>>("users") ?? [];

    if (users.some(it => it.username === user.username)) {
      return Promise.reject();
    }

    users.push(user)
    this.localStorageService.saveData("users", users);

    this.localStorageService.saveData("user", user);
    return Promise.resolve();
  }

  // real implementation

  // public login(user: User): Promise<any> {
  //   return this.httpClient.post(`${environment.api_url}/api/login`,null,  {headers: {
  //       username: user.username,
  //       password: user.password
  //     }, observe: 'response'})
  //     .toPromise()
  //     .then(() => this.localStorageService.saveData("user", user))
  // }
  //
  // public register(user: User): Promise<any> {
  //   return this.httpClient.post(`${environment.api_url}/api/user`, user, {observe: 'response'}).toPromise()
  //     .then(() => {
  //       this.localStorageService.saveData("user", user);
  //     })
  // }
}
