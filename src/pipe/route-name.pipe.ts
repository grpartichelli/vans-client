import {Injectable, Pipe, PipeTransform} from "@angular/core";
import {RouteModel} from "../models/route.model";
import {DirectionType} from "../models/directionType.model";

@Injectable({providedIn: 'root'})
@Pipe({
  name: 'routename'
})
export class RouteNamePipe implements PipeTransform {
  
  transform(route: RouteModel) {

    if (route.direction === DirectionType.TO) {
      return "Ida à " + route.name;
    } else if(route.direction === DirectionType.BACK) {
      return "Volta de " + route.name;
    }
    return "Ida e volta " + route.name
  }
}
