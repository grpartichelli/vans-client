import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {StudentModel} from "../models/student.model";


@Injectable({providedIn: 'root'})
export class StudentService {

  constructor(private readonly httpClient: HttpClient, private readonly localStorageService: LocalStorageService) {
  }

  // mock implementation
  public save(student: StudentModel): Promise<any> {
    let students = this.localStorageService.getData<Array<StudentModel>>("students") ?? []
    let newStudents = students.filter(it => it.id !== student.id);
    newStudents.push(student);
    this.localStorageService.saveData("students", newStudents);
    return Promise.resolve();
  }

  public find(): Promise<Array<StudentModel>> {
    let students = this.localStorageService.getData<Array<StudentModel>>("students") ?? []
    students.sort((one, two) => (one.name > two.name ? 1 : -1))
    return Promise.resolve(students);
  }
}
