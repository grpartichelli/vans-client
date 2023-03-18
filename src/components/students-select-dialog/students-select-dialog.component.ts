import {Component, Input, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {StudentService} from "../../service/student.service";
import {RouteModel} from "../../models/route.model";
import {StudentModel} from "../../models/student.model";
import {RouteService} from "../../service/route.service";
import {UserService} from "../../service/user.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-students-select-dialog',
  templateUrl: './students-select-dialog.component.html',
  styleUrls: ['./students-select-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentsSelectDialogComponent {

  public studentsSelected: Array<StudentSelect> = [];
  public capacity = new UserModel("", "").vanCapacity;
  public selected = this.studentsSelected.filter(it => it.selected).length;
  public isSelectionValid = this.selected <= this.capacity;

  constructor(public dialogRef: MatDialogRef<StudentsSelectDialogComponent, RouteModel>,
              private readonly  studentService: StudentService,
              private readonly  userService: UserService,
              private readonly routeService: RouteService
              ) {
    this.init();
  }

  @Input() route: RouteModel = new RouteModel()


  public init() {
    this.userService.current().then((user) =>
      this.capacity = user?.vanCapacity ?? new UserModel("", "").vanCapacity
    ).then(
      () => {
        this.studentService.find()
          .then(students => {
            students.forEach(student=> this.studentsSelected.push(
                {student, selected: !!this.route.students.find(it => student.id === it.id)}
              )
            )

          })
      }
    )
  }
  public onStudentClick(studentSelect: StudentSelect): void {
      studentSelect.selected = !studentSelect.selected;
      this.selected = this.studentsSelected.filter(it => it.selected).length
      this.isSelectionValid = this.selected <= this.capacity;
  }

  public close(): void {
    this.dialogRef.close(this.route);
  }

  public onSubmit(): void {
    this.route.students = this.studentsSelected.filter(it => it.selected).map(it => it.student)
    this.routeService.save(this.route)
      .then(() => this.dialogRef.close(this.route))
  }

}

type StudentSelect = {
  student: StudentModel,
  selected: boolean
}
