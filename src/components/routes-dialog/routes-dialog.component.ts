import {Component, Input} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {StudentModel} from "../../models/student.model";
import {StudentService} from "../../service/student.service";
import {RouteModel} from 'src/models/route.model';
import {RouteService} from "../../service/route.service";
import {ShiftType} from "../../models/shiftType.model";

@Component({
  selector: 'app-routes-dialog',
  templateUrl: './routes-dialog.component.html',
  styleUrls: ['./routes-dialog.component.scss']
})
export class RoutesDialogComponent {
  constructor(public dialogRef: MatDialogRef<RoutesDialogComponent, RouteModel>,
              private readonly  routeService: RouteService) {
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
}
