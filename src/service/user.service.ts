import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {UserModel} from "../models/user.model";
import {environment} from "../environments/environment.prod";
import {SecurityHeaders} from "../security/security-headers";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private readonly httpClient: HttpClient,
              private readonly localStorageService: LocalStorageService,
              private readonly securityHeaders: SecurityHeaders) {}

  public current(): Promise<UserModel | null> {
    return Promise.resolve(this.localStorageService.getData<UserModel>("user"));
  }

  public update(user: UserModel): Promise<any> {
      console.log(user)
      return this.httpClient.post(`${environment.api_url}/user/update`, user, { headers: this.securityHeaders.get(), observe: 'response', responseType: 'text'}, ).toPromise()
        .then(() =>
          this.localStorageService.saveData("user", user)
        )
  }

  public login(user: UserModel): Promise<any> {
    return this.httpClient.post(`${environment.api_url}/login`,null,  {headers: {
        username: user.username,
        password: user.password
      }, observe: 'response'})
      .toPromise()
      .then((account) => {
        this.localStorageService.saveData("user", account?.body)
        return account
      })
  }

  public register(user: UserModel): Promise<any> {
    return this.httpClient.post(`${environment.api_url}/user`,
      {username: user.username, password: user.password, vanCapacity: user.vanCapacity, name: user.name},
      {observe: 'response', responseType: 'text'}
    ).toPromise()
      .then(() =>
        this.login(user)
      )
  }
}
