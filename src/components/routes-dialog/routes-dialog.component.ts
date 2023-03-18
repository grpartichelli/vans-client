import {Component, Input} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RouteModel} from 'src/models/route.model';
import {RouteService} from "../../service/route.service";
import {ShiftType} from "../../models/shiftType.model";
import {StudentsSelectDialogComponent} from "../students-select-dialog/students-select-dialog.component";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {StudentModel} from "../../models/student.model";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {DirectionType} from "../../models/directionType.model";

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
  public shifts : Array<ShiftType> = Object.values(ShiftType);
  public directions : Array<DirectionType> = Object.values(DirectionType).filter(it => it !== DirectionType.BOTH)


  public close(): void {
    this.dialogRef.close();
  }

  public delete(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      panelClass: 'custom-dialog-container',
      autoFocus: false
    })

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.routeService.delete(this.route).then(() => this.dialogRef.close())
        }
      })
  }

  public isDeleteEnabled(): boolean {
    return this.route.id !== ''
  }

  public onSubmit(): void {
    this.routeService.save(this.route)
      .then(() => {
        this.dialogRef.close(this.route)
      })
  }

  public drop(event: CdkDragDrop<Array<StudentModel>, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  public openStudentSelectDialog() {

    const dialogRef = this.dialog.open(StudentsSelectDialogComponent, {
      panelClass: 'custom-dialog-container',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      autoFocus: false
    })

    dialogRef.componentInstance.route = this.route;
  }

  public startName(): string {
    return this.route.name && this.route.direction === DirectionType.BACK ? this.route.name : "início";
  }

  public endName(): string {
    return this.route.name && this.route.direction === DirectionType.TO ? this.route.name : "fim";

  }
}
