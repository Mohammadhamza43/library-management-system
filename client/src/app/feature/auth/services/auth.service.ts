import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {
  }
  login(email: any, password: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'users/login', {email, password});
  }
  logout() {
    localStorage.clear();
    window.location.href = '/'
  }
}
