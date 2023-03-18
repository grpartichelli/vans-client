import {Pipe, PipeTransform} from "@angular/core";
import {DirectionType} from "../models/directionType.model";

@Pipe({
  name: 'direction'
})
export class DirectionPipe implements PipeTransform{
  transform(type : DirectionType) {

    if (type === DirectionType.BOTH) {
      return "Ida e volta"
    } else if (type === DirectionType.TO) {
      return "Ida à escola"
    }

    return "Volta da escola"
  }
}
