import {Component, Input} from '@angular/core';
import {Student} from "../../models/student.model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss']
})
export class StudentsDialogComponent {

  constructor(public dialogRef: MatDialogRef<StudentsDialogComponent>){}

  @Input() student: Student = new Student();

  public close():void {
    this.dialogRef.close();

  }

  public onSubmit(): void {

  }
}
