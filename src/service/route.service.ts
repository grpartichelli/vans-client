import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {StudentModel} from "../models/student.model";
import {RouteModel} from "../models/route.model";


@Injectable({providedIn: 'root'})
export class RouteService {

  constructor(private readonly httpClient: HttpClient, private readonly localStorageService: LocalStorageService) {
  }

  // mock implementation
  public save(route: RouteModel): Promise<any> {
    let routes = this.localStorageService.getData<Array<RouteModel>>("routes") ?? []
    let newRoutes = routes.filter(it => it.id !== route.id);
    newRoutes.push(route);
    this.localStorageService.saveData("routes", newRoutes);
    return Promise.resolve();
  }

  public find(): Promise<Array<RouteModel>> {
    let routes = this.localStorageService.getData<Array<RouteModel>>("routes") ?? []
    return Promise.resolve(routes);
  }
}
