import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RouteModel} from "../../models/route.model";
import {RouteService} from "../../service/route.service";
import {RoutesDialogComponent} from "../routes-dialog/routes-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent {
  public routes: Array<RouteModel> = [];

  constructor(public dialog: MatDialog, public routeService: RouteService, public router: Router) {
    this.loadList()
    this.openEditDialog(new Event("test"))
  }

  public loadList(): void {
    this.routeService.find()
      .then(it => this.routes = it)
  }

  public play(event: Event, route: RouteModel) {
    event.stopPropagation()
    this.router.navigate(['play', route.id]).then()
  }

  public openEditDialog(event: Event, route: RouteModel = new RouteModel()) {

    event.stopPropagation();

    const dialogRef = this.dialog.open(RoutesDialogComponent, {
      panelClass: 'custom-dialog-container',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      autoFocus: false
    })

    dialogRef.componentInstance.route = route;

    dialogRef
      .afterClosed()
      .subscribe(() => this.loadList())
  }
}
