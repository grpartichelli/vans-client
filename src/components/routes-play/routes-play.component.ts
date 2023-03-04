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

  private startStudent = () => {
    let student = new StudentModel();
    student.name = "Início"
    student.address = "Endereço de ínicio"
    return student;
  }

  private endStudent = () => {
    let student = new StudentModel()
    student.name = "Fim"
    student.address = "Endereço de fim"
    return student;
  }

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly routeService: RouteService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>
      this.routeService.find()
        .then(routes => routes.find(it => it.id === params['id']) || new RouteModel())
        .then(route => {
          this.route = route;
          route.students.unshift(this.startStudent())
          route.students.push(this.endStudent())
          this.updateCurrentStudent()
        })
    )
  }

  updateCurrentStudent() {
    this.student = this.route.students[this.studentIndex]
  }

}
