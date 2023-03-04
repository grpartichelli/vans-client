import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {RouteModel} from "../models/route.model";


@Injectable({providedIn: 'root'})
export class RouteService {

  constructor(private readonly httpClient: HttpClient, private readonly localStorageService: LocalStorageService) {
  }

  // mock implementation
  public save(route: RouteModel): Promise<void> {
    let routes = this.localStorageService.getData<Array<RouteModel>>("routes") ?? []

    if (route.id === '') {
        route.id = routes.length.toString();
    }

    let newRoutes = routes.filter(it => it.id !== route.id);
    newRoutes.push(route);
    this.localStorageService.saveData("routes", newRoutes);
    return Promise.resolve();
  }

  public delete(route: RouteModel) : Promise<void> {
    let routes = this.localStorageService.getData<Array<RouteModel>>("routes") ?? []

    let i = 0;
    let newRoutes = routes.filter(it => it.id !== route.id)
      .map(route => {
        route.id = i.toString()
        i += 1;
        return route;
      })

    this.localStorageService.saveData("routes", newRoutes);
    return Promise.resolve();
  }

  public find(): Promise<Array<RouteModel>> {
    let routes = this.localStorageService.getData<Array<RouteModel>>("routes") ?? []
    routes.sort((one, two) => (one.name > two.name ? 1 : -1))
    return Promise.resolve(routes);
  }
}
