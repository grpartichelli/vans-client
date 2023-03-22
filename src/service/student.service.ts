import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {StudentModel} from "../models/student.model";
import {environment} from "../environments/environment.prod";
import {SecurityHeaders} from "../security/security-headers";


@Injectable({providedIn: 'root'})
export class StudentService {

  constructor(private readonly httpClient: HttpClient, private readonly securityHeaders: SecurityHeaders) {
  }

  public save(student: StudentModel): Promise<void> {
    if (!student._id) {
      return this.httpClient.post(`${environment.api_url}/student/new`,
        student,
        {headers: this.securityHeaders.get(), responseType: 'text'}).toPromise()
        .then();
    }

    return this.httpClient.post(`${environment.api_url}/student/update`,
      student,
      {headers: this.securityHeaders.get(), responseType: 'text'}).toPromise()
      .then();
  }

  public delete(student: StudentModel): Promise<void> {
    return this.httpClient.delete(`${environment.api_url}/student/delete`,
      {headers: this.securityHeaders.get(), body: student, responseType: 'text'})
      .toPromise()
      .then()
  }

  public find(): Promise<Array<StudentModel>> {
    return this.httpClient.get<Array<StudentModel>>(`${environment.api_url}/student/`, {headers: this.securityHeaders.get()})
      .toPromise()
      .then(it => {
        if (it == null) {
          return []
        }
        return it;
      })
  }
}
