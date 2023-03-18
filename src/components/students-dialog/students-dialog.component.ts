import {Component, Input} from '@angular/core';
import {StudentModel} from "../../models/student.model";
import {ShiftType} from "../../models/shiftType.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DirectionType} from "../../models/directionType.model";
import {StudentService} from "../../service/student.service";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss']
})
export class StudentsDialogComponent {


  constructor(public dialogRef: MatDialogRef<StudentsDialogComponent, StudentModel>,
              private readonly dialog: MatDialog,
              private readonly  studentService: StudentService) {
  }

  @Input() student: StudentModel = new StudentModel();
  public shifts : Array<ShiftType> = Object.values(ShiftType);

  public directions : Array<DirectionType> = Object.values(DirectionType);


  public close(): void {
    this.dialogRef.close();
  }

  public isDeleteEnabled(): boolean {
    return this.student.id !== '';
  }

  public delete(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      panelClass: 'custom-dialog-container',
      autoFocus: false
    })

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.studentService.delete(this.student).then(() => this.dialogRef.close())
        }
      })
  }

  public onSubmit(): void {
    this.studentService.save(this.student)
      .then(() => {
        this.dialogRef.close(this.student)
      })
  }
}
