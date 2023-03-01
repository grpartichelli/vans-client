import {Component, Input} from '@angular/core';
import {StudentModel} from "../../models/student.model";
import {ShiftType} from "../../models/shiftType.model";
import {MatDialogRef} from "@angular/material/dialog";
import {DirectionType} from "../../models/directionType.model";
import {StudentService} from "../../service/student.service";

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss']
})
export class StudentsDialogComponent {


  constructor(public dialogRef: MatDialogRef<StudentsDialogComponent, StudentModel>,
              private readonly  studentService: StudentService) {
  }

  @Input() student: StudentModel = new StudentModel();
  public shifts = [{
    key: ShiftType.MORNING,
    view: "Manhã"
  }, {
    key: ShiftType.AFTERNOON,
    view: "Tarde"
  },];

  public directions = [
    {
      key: DirectionType.BOTH,
      view: "Ida e volta"
    }, {
      key: DirectionType.TO,
      view: "Somente ida"
    }, {
      key: DirectionType.BACK,
      view: "Somenta volta"
    },
  ];


  public close(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    this.studentService.save(this.student)
      .then(() => {
        this.dialogRef.close(this.student)
      })
  }
}
