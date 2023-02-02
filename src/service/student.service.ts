import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {Student} from "../models/student.model";


@Injectable({providedIn: 'root'})
export class StudentService {

  constructor(private readonly httpClient: HttpClient, private readonly localStorageService: LocalStorageService) {
  }

  // mock implementation
  public save(student: Student): Promise<any> {
    let students = this.localStorageService.getData<Array<Student>>("students") ?? []
    let newStudents = students.filter(it => it.name !== student.name);
    newStudents.push(student);
    this.localStorageService.saveData("students", newStudents);
    return Promise.resolve();
  }
}
