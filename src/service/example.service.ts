import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {SecurityHeaders} from "./security-headers";

@Injectable({providedIn: 'root'})
export class ExampleService {
  private readonly url: string = `${environment.api_url}/user`;

  constructor(private readonly httpClient: HttpClient, private readonly securityHeaders: SecurityHeaders) {
  }

  public find(): Promise<string | undefined> {
    return this.httpClient.get(this.url,
      {responseType: 'text',  headers: this.securityHeaders.get()}).toPromise()
  }


}
