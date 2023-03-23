import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SecurityHeaders} from "../security/security-headers";
import {environment} from "../environments/environment.prod";
import {RouteModel} from "../models/route.model";
import {StudentService} from "./student.service";


@Injectable({providedIn: 'root'})
export class RouteService {

  constructor(private readonly httpClient: HttpClient,
              private readonly securityHeaders: SecurityHeaders,
              private readonly studentService: StudentService) {
  }

  public save(route: RouteModel): Promise<void> {
    route.studentIds = route.students.filter(it => !!it).map(it => it._id) as Array<string>
    if (!route._id) {
      return this.httpClient.post(`${environment.api_url}/route/new`,
        route,
        {headers: this.securityHeaders.get(), responseType: 'text'}).toPromise()
        .then();
    }

    return this.httpClient.post(`${environment.api_url}/route/update`,
      route,
      {headers: this.securityHeaders.get(), responseType: 'text'}).toPromise()
      .then();
  }

  public delete(route: RouteModel): Promise<void> {
    return this.httpClient.delete(`${environment.api_url}/route/delete`,
      {headers: this.securityHeaders.get(), body: route, responseType: 'text'})
      .toPromise()
      .then()
  }

  public find(): Promise<Array<RouteModel>> {
    return this.studentService.find()
      .then((students) => {
        let map = new Map();
        students.forEach(it => map.set(it._id, it));
        return this.httpClient.get<Array<RouteModel>>(`${environment.api_url}/route/`, {headers: this.securityHeaders.get()})
          .toPromise()
          .then(routes => {
            if (routes == null) {
              return []
            }

            return routes.map(route => {
              route.students = []
              route.studentIds.forEach((id) => {
                if (map.has(id)) {
                    route.students.push(map.get(id))
                } else {
                  const index = route.studentIds.indexOf(id);
                  route.studentIds.splice(index, 1);
                }
              })
              return route;
            })
          })
      })
  }

}
