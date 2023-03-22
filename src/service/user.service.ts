import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {UserModel} from "../models/user.model";
import {environment} from "../environments/environment.prod";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private readonly httpClient: HttpClient, private readonly localStorageService: LocalStorageService) {}

  // mock implementation
  public login(user: UserModel): Promise<any> {
    let users = this.localStorageService.getData<Array<UserModel>>("users") ?? [];

    let loginUser = users.find(it => it.username === user.username && it.password === user.password)
    if (!loginUser) {
      return Promise.reject();
    }

    this.localStorageService.saveData("user", loginUser);
    return Promise.resolve();
  }

  // public register(user: UserModel): Promise<any> {
  //   let users = this.localStorageService.getData<Array<UserModel>>("users") ?? [];
  //
  //   if (users.some(it => it.username === user.username)) {
  //     return Promise.reject();
  //   }
  //
  //   users.push(user)
  //   this.localStorageService.saveData("users", users);
  //
  //   this.localStorageService.saveData("user", user);
  //   return Promise.resolve();
  // }


  public current(): Promise<UserModel | null> {
    return Promise.resolve(this.localStorageService.getData<UserModel>("user"));
  }

  public save(user: UserModel): Promise<any> {
      let users = this.localStorageService.getData<Array<UserModel>>("users") ?? [];

      let newUsers = users.filter(it => it.username !== user.username);
      newUsers.push(user)

      this.localStorageService.saveData("users", newUsers);
      console.log(newUsers)
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

  public register(user: UserModel): Promise<any> {
    return this.httpClient.post(`${environment.api_url}/user`, user, {observe: 'response'}).toPromise()
      .then(() => {
        this.localStorageService.saveData("user", user);
      })
  }
}
