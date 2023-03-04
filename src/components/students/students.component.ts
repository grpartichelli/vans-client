import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StudentsDialogComponent} from "../students-dialog/students-dialog.component";
import {StudentModel} from "../../models/student.model";
import {StudentService} from "../../service/student.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  public students: Array<StudentModel> = [];

  constructor(public dialog: MatDialog, public studentService: StudentService) {
    this.loadList()
  }

  public loadList(): void {
    this.studentService.find()
      .then(it => this.students = it)
  }

  public openEditDialog(event: Event, student: StudentModel = new StudentModel()) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(StudentsDialogComponent, {
      panelClass: 'custom-dialog-container',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      autoFocus: false
    })

    dialogRef.componentInstance.student = student;

    dialogRef
      .afterClosed()
      .subscribe(() => this.loadList())
  }
}
