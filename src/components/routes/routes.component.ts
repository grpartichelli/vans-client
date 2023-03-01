import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RouteModel} from "../../models/route.model";
import {RouteService} from "../../service/route.service";
import {RoutesDialogComponent} from "../routes-dialog/routes-dialog.component";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent {
  public routes: Array<RouteModel> = [];

  constructor(public dialog: MatDialog, public routeService: RouteService) {
    this.loadList()
  }

  public loadList(): void {
    this.routeService.find()
      .then(it => this.routes = it)
  }

  public onRouteClicked(route: RouteModel) {
    this.openEditDialog(route)
  }

  public openEditDialog(route: RouteModel = new RouteModel()) {

    if (route.id === "") {
      route.id = this.routes.length.toString();
    }
    const dialogRef = this.dialog.open(RoutesDialogComponent, {
      panelClass: 'custom-dialog-container',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
    })

    dialogRef.componentInstance.route = route;

    dialogRef
      .afterClosed()
      .subscribe(() => this.loadList())
  }
}
