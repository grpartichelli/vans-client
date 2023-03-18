import {ShiftType} from "./shiftType.model";
import {StudentModel} from "./student.model";

export class RouteModel {
  public name = '';
  public id = '';
  public shift = ShiftType.MORNING;
  public students : Array<StudentModel> = [];
  public username = ''
}
