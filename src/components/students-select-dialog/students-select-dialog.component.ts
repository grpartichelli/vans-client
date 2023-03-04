import {Component, Input} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {StudentService} from "../../service/student.service";
import {RouteModel} from "../../models/route.model";

@Component({
  selector: 'app-students-select-dialog',
  templateUrl: './students-select-dialog.component.html',
  styleUrls: ['./students-select-dialog.component.scss']
})
export class StudentsSelectDialogComponent {

  constructor(public dialogRef: MatDialogRef<StudentsSelectDialogComponent, RouteModel>,
              private readonly  studentService: StudentService) {
  }

  @Input() route: RouteModel = new RouteModel()

  public close(): void {
    this.dialogRef.close(this.route);
  }

  public onSubmit(): void {
    this.dialogRef.close(this.route)
  }
}
