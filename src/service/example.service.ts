import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class ExampleService {
  private readonly url: string = `${environment.api_url}/`;

  constructor(private httpClient: HttpClient) {
  }

  public find(): Promise<string | undefined> {
    return this.httpClient.get(this.url,
      {responseType: 'text'}).toPromise()
  }


}
