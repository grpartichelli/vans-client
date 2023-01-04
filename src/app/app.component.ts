import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private readonly http: HttpClient) {}

  public request() {
    this.http.get('https://pokeapi.co/api/v2/pokemon/ditto')
      .toPromise()
      .then(it => console.log(it))
  }
}
