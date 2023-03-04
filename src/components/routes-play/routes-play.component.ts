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

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly routeService: RouteService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>
      this.routeService.find()
        .then(routes => routes.find(it => it.id === params['id']) || new RouteModel())
        .then(route => {
          this.route = route;
          this.updateCurrentStudent()
        })
    )
  }

  updateCurrentStudent() {
    this.student = this.route.students[this.studentIndex]
  }

  isBackDisabled() : boolean {
    return this.studentIndex === 0
  }

  goBack() {
    this.studentIndex -= 1;
    this.updateCurrentStudent()
  }

  isFinalDestination(): boolean {
    return this.studentIndex === this.route.students.length - 1
  }

  goForward() {
    this.studentIndex += 1;
    this.updateCurrentStudent();
  }

}
