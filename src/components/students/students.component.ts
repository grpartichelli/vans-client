import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

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
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.updateList()
    });
  }
}
