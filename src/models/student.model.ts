import {ShiftType} from "./shiftType.model";
import {DirectionType} from "./directionType.model";

export class StudentModel {
  public name = '';
  public address = '';
  public legalGuardianName = '';
  public phone = '';
  public email = '';
  public paymentAmount = 0;
  public shift = ShiftType.MORNING;
  public direction = DirectionType.BOTH
  public username = "";
  public id = "";
}
