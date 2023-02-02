import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StudentsDialogComponent} from "../students-dialog/students-dialog.component";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {


  constructor(public dialog: MatDialog) {
  }

  public updateList(): void {

  }


  public openEditDialog() {
    const dialogRef = this.dialog.open(StudentsDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateList()
    });
  }
}
