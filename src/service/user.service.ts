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
      return this.httpClient.post(`${environment.api_url}/user/update`, user, { headers: this.securityHeaders.get(), observe: 'response', responseType: 'text'}, ).toPromise()
        .then(() =>
          this.login(user)
        )
  }

  public login(user: UserModel): Promise<any> {
    return this.httpClient.post(`${environment.api_url}/login`,null,  {headers: {
        username: user.username,
        password: user.password
      }, observe: 'response'})
      .toPromise()
      .then((it) => {
        let account = (it?.body as UserModel)
        account.password = user.password;
        this.localStorageService.saveData("user", account)
        return account
      })
  }

  public register(user: UserModel): Promise<any> {
    return this.httpClient.post(`${environment.api_url}/user`,
      user,
      {observe: 'response', responseType: 'text'}
    ).toPromise()
      .then(() =>
        this.login(user)
      )
  }
}
