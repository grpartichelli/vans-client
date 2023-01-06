import {Component} from '@angular/core';
import {ExampleService} from "../service/example.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private readonly exampleService: ExampleService) {}

  public request() {
    this.exampleService.find()
      .then(it => console.log(it))
  }
}
