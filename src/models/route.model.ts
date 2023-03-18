import {ShiftType} from "./shiftType.model";
import {StudentModel} from "./student.model";
import {DirectionType} from "./directionType.model";

export class RouteModel {
  public name = '';
  public id = '';
  public shift = ShiftType.MORNING;
  public direction = DirectionType.TO;
  public students : Array<StudentModel> = [];
  public username = ''
}
