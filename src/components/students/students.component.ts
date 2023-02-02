import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StudentsDialogComponent} from "../students-dialog/students-dialog.component";
import {Student} from "../../models/student.model";
import {StudentService} from "../../service/student.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  public students: Array<Student> = [];

  constructor(public dialog: MatDialog, public studentService: StudentService) {
    this.loadList()
  }

  public loadList(): void {
    this.studentService.find()
      .then(it => this.students = it)
  }

  public onStudentClicked(student: Student) {
    this.openEditDialog(student)
  }

  public openEditDialog(student: Student = new Student()) {

    if (student.id === "") {
      student.id = this.students.length.toString();
    }
    const dialogRef = this.dialog.open(StudentsDialogComponent, {
      panelClass: 'custom-dialog-container',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
    })

    dialogRef.componentInstance.student = student;

    dialogRef
      .afterClosed()
      .subscribe(() => this.loadList())
  }
}
