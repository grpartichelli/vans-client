import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RouteService} from "../../service/route.service";
import {RouteModel} from "../../models/route.model";
import {DirectionType} from "../../models/directionType.model";
import {UserService} from "../../service/user.service";
import {UserModel} from "../../models/user.model";
import {StudentModel} from "../../models/student.model";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmSelectDialogComponent} from "../confirm-select-dialog/confirm-select-dialog.component";

@Component({
  selector: 'app-routes-play',
  templateUrl: './routes-play.component.html',
  styleUrls: ['./routes-play.components.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RoutesPlayComponent implements OnInit{

  public route = new RouteModel();
  public hasFinished = false;
  public steps : Array<Step> = []
  public step = new Step("", "", null, false)
  public stepIndex = 0
  public user = new UserModel("", "")
  public hasConfirmedStudents = false
  public studentsSelect: Array<StudentSelect> = []


  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly routeService: RouteService,
              private readonly userService: UserService,
              private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>
      this.routeService.find()
        .then(routes => routes.find(it => it.id === params['id']) || new RouteModel())
        .then(route => {
          this.route = route;

          this.hasConfirmedStudents = this.route.direction !== DirectionType.BACK || this.route.students.length === 0
          this.route.students.forEach(student => this.studentsSelect.push(
              {student, selected: false}
            )
          )

          if (this.route.direction === DirectionType.BACK) {
            this.steps.push(new Step(this.route.name, "Destino inicial", null, false))
          }

          this.route.students.forEach(
            (student) => this.steps.push(new Step(student.address, "Destino de " + student.name, student.phone, true))
          )

          if (this.route.direction === DirectionType.TO) {
            this.steps.push(new Step(this.route.name, "Destino final", null, false))
          }

          this.hasFinished = this.steps.length === 0;
          this.updateCurrentStep();
        })
        .then(() =>
          this.userService.current()
          .then((user) => this.user = user || new UserModel("", "")))
    )
  }

  updateCurrentStep() {
    if (this.stepIndex < this.steps.length) {
      this.step = this.steps[this.stepIndex]
    }
  }

  isBackDisabled() : boolean {
    return this.stepIndex === 0
  }

  goBack() {
    this.stepIndex -= 1;
    this.hasFinished = false;
    this.updateCurrentStep()
    this.steps[this.stepIndex].isConcluded = false
  }

  goForward() {
    this.steps[this.stepIndex].isConcluded = true
    this.stepIndex += 1;
    this.hasFinished = this.steps.length === this.stepIndex;

    if (this.hasFinished) {
      return;
    }

    this.updateCurrentStep();
  }

  goToRoutes() {
    this.router.navigate(['routes']).then()
  }

  getCapacity(): string {
    let count = this.steps.filter(it => it.isStudent
      && ((it.isConcluded && this.route.direction === DirectionType.TO)) || !it.isConcluded && this.route.direction === DirectionType.BACK)
      .length
    return "Capacidade da van: "  + count +  "/" + this.user.vanCapacity;
  }

  deleteCurrentStep(): void {
    this.steps.splice(this.stepIndex, 1)
    this.stepIndex -= 1;
    this.goForward()
  }

  onStudentClick(studentSelect: StudentSelect): void {
    studentSelect.selected = !studentSelect.selected;
  }

  confirmStudents(): void {

    if (!this.studentsSelect.some(it => !it.selected)) {
      this.hasConfirmedStudents = true;

      return;
    }

    const dialogRef = this.dialog.open(ConfirmSelectDialogComponent, {
      panelClass: 'custom-dialog-container',
      autoFocus: false
    })

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.steps = this.steps.filter(it => !it.isStudent
            || !this.studentsSelect.some(x => !x.selected && (x.student.address === it.address || "Destino de " + x.student.name === it.description)))

          this.hasConfirmedStudents = true;
        }
      })
  }
}

type StudentSelect = {
  student: StudentModel,
  selected: boolean
}


export class Step {

  public isConcluded = false;

  constructor(
    public readonly address: string,
    public readonly description: string,
    public readonly phone: string | null,
    public readonly isStudent: boolean,
  ) {}

}
