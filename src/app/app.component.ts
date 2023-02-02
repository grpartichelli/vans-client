import {Component} from '@angular/core';
import {ExampleService} from "../service/example.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly exampleService: ExampleService) {}


}
