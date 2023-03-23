import {Component, OnInit} from '@angular/core';
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
export class RoutesComponent implements OnInit {
  public routes: Array<RouteModel> = [];
  public loading = false;

  constructor(public dialog: MatDialog, public routeService: RouteService, public router: Router) {
  }

  ngOnInit(): void {
    this.loadList()
  }

  public loadList(): void {
    if (this.loading) {
      return;
    }
    this.loading = true

    this.routeService.find()
      .then(it => {
        this.routes = it
        this.loading = false
      }).catch(() => {
      this.loading = false
    })
  }

  public play(event: Event, route: RouteModel) {
    event.stopPropagation()
    this.router.navigate(['play', route._id]).then()
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
