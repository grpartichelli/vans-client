import {Component, Input} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RouteModel} from 'src/models/route.model';
import {RouteService} from "../../service/route.service";
import {ShiftType} from "../../models/shiftType.model";
import {StudentsSelectDialogComponent} from "../students-select-dialog/students-select-dialog.component";

@Component({
  selector: 'app-routes-dialog',
  templateUrl: './routes-dialog.component.html',
  styleUrls: ['./routes-dialog.component.scss']
})
export class RoutesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RoutesDialogComponent, RouteModel>,
    private readonly  routeService: RouteService,
    public dialog: MatDialog) {
  }

  @Input() route: RouteModel = new RouteModel();

  public shifts = [{
    key: ShiftType.MORNING,
    view: "Manhã"
  }, {
    key: ShiftType.AFTERNOON,
    view: "Tarde"
  },];


  public close(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    this.routeService.save(this.route)
      .then(() => {
        this.dialogRef.close(this.route)
      })
  }

  public openStudentSelectDialog() {

    const dialogRef = this.dialog.open(StudentsSelectDialogComponent, {
      panelClass: 'custom-dialog-container',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
    })

    dialogRef.componentInstance.route = this.route;

    dialogRef.afterClosed().subscribe()
  }
}
