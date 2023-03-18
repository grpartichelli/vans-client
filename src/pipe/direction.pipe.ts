import {Injectable, Pipe, PipeTransform} from "@angular/core";
import {DirectionType} from "../models/directionType.model";

@Injectable({providedIn: 'root'})
@Pipe({
  name: 'direction'
})
export class DirectionPipe implements PipeTransform{
  transform(type : DirectionType) {

    if (type === DirectionType.BOTH) {
      return "Ida e volta"
    } else if (type === DirectionType.TO) {
      return "Ida à instituição"
    }

    return "Volta da instituição"
  }
}
