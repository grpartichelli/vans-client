import {Component, Input, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {StudentService} from "../../service/student.service";
import {RouteModel} from "../../models/route.model";
import {StudentModel} from "../../models/student.model";
import {RouteService} from "../../service/route.service";

@Component({
  selector: 'app-students-select-dialog',
  templateUrl: './students-select-dialog.component.html',
  styleUrls: ['./students-select-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentsSelectDialogComponent {

  public studentsSelected: Array<StudentSelect> = [];

  constructor(public dialogRef: MatDialogRef<StudentsSelectDialogComponent, RouteModel>,
              private readonly  studentService: StudentService,
              private readonly routeService: RouteService
              ) {

    this.studentService.find()
      .then(students => {
        students.forEach(student=> this.studentsSelected.push(
          {student, selected: !!this.route.students.find(it => student.id === it.id)}
          )
        )

      })
  }

  @Input() route: RouteModel = new RouteModel()

  public onStudentClick(studentSelect: StudentSelect): void {
      studentSelect.selected = !studentSelect.selected;
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
