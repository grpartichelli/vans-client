import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {ShiftType} from "../models/shiftType.model";

@Injectable({providedIn: 'root'})
@Pipe({
  name: 'shift'
})
export class ShiftPipe implements PipeTransform{
  transform(shift : ShiftType) {

      if (shift === ShiftType.MORNING) {
        return "Manhã"
      } else {
        return "Tarde"
      }
  }
}
