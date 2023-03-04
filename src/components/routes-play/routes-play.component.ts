import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RouteService} from "../../service/route.service";
import {RouteModel} from "../../models/route.model";

@Component({
  selector: 'app-routes-play',
  templateUrl: './routes-play.component.html',
  styleUrls: ['./routes-play.component.css']
})
export class RoutesPlayComponent implements OnInit{

  public route = new RouteModel();

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly routeService: RouteService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>
      this.routeService.find()
        .then(routes => this.route = routes.find(it => it.id === params['id']) || new RouteModel())
    )
  }


}
