import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RouteService} from "../../service/route.service";
import {RouteModel} from "../../models/route.model";
import {StudentModel} from "../../models/student.model";

@Component({
  selector: 'app-routes-play',
  templateUrl: './routes-play.component.html',
  styleUrls: ['./routes-play.components.scss']
})
export class RoutesPlayComponent implements OnInit{

  public route = new RouteModel();
  public studentIndex = 0;
  public student = new StudentModel();
  public hasFinished = false;


  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly routeService: RouteService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>
      this.routeService.find()
        .then(routes => routes.find(it => it.id === params['id']) || new RouteModel())
        .then(route => {
          this.route = route;
          this.hasFinished = this.route.students.length === 0;
          this.updateCurrentStudent()
        })
    )
  }

  updateCurrentStudent() {
    if (this.studentIndex < this.route.students.length) {
      this.student = this.route.students[this.studentIndex]
    }
  }

  isBackDisabled() : boolean {
    return this.studentIndex === 0
  }

  goBack() {
    this.studentIndex -= 1;
    this.hasFinished = false;
    this.updateCurrentStudent()
  }

  goForward() {
    this.studentIndex += 1;
    this.hasFinished = this.route.students.length === this.studentIndex;

    if (this.hasFinished) {
      return;
    }

    this.updateCurrentStudent();
  }

  goToRoutes() {
    this.router.navigate(['routes']).then()
  }

}
