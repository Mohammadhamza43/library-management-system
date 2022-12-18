import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {IApiResponse} from "../../../../shared/models/IApiResponse";
import {IUser} from "../../../../shared/models/IUser";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = environment.baseUrl + 'users'
  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAllUsers(): Observable<IApiResponse<IUser[]>> {
    return this.httpClient.get<IApiResponse<IUser[]>>(this.baseUrl)
  }

  deleteStudentById(id: any): Observable<IApiResponse<any>> {
    return this.httpClient.delete<IApiResponse<any>>(this.baseUrl + `/${id}`)
  }

  getStudentById(id: any): Observable<IApiResponse<IUser>> {
    return this.httpClient.get<IApiResponse<IUser>>(this.baseUrl + `/${id}`)
  }

  updateStudent(student: IUser): Observable<IApiResponse<any>> {
    return this.httpClient.put<IApiResponse<any>>(this.baseUrl + `/${student._id}`, student)
  }

  createStudent(student: IUser) {
    return this.httpClient.post<IApiResponse<any>>(this.baseUrl, student)
  }
}
