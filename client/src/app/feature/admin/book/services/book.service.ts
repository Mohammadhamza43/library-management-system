import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {IBook} from "../models/IBook";
import {IApiResponse} from "../../../../shared/models/IApiResponse";
import {DecodeTokenService} from "../../../../shared/services/decode-token.service";
import {IUser} from "../../../../shared/models/IUser";
import {IStudentBooks} from "../models/IStudentBooks";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl = environment.baseUrl + 'books';
  user: IUser = {} as IUser

  constructor(
    private httpClient: HttpClient,
    private tokenService: DecodeTokenService) {
    this.user = this.tokenService.getUser()

  }

  getAllBooks(): Observable<IApiResponse<IBook[]>> {
    return this.httpClient.get<IApiResponse<IBook[]>>(this.baseUrl)
  }

  createBook(book: IBook): Observable<IApiResponse<any>> {
    return this.httpClient.post<IApiResponse<any>>(this.baseUrl + '/create', book)
  }

  getBookById(id: any): Observable<IApiResponse<IBook>> {
    return this.httpClient.get<IApiResponse<IBook>>(this.baseUrl + `/${id}`)
  }

  updateBook(book: IBook): Observable<IApiResponse<any>> {
    return this.httpClient.put<IApiResponse<any>>(this.baseUrl + `/update/${book._id}`, book)
  }

  deleteBookById(id: any): Observable<IApiResponse<any>> {
    return this.httpClient.delete<IApiResponse<any>>(this.baseUrl + `/${id}`)
  }

  borrowBook(id: any): Observable<IApiResponse<any>> {
    return this.httpClient.post<IApiResponse<any>>(this.baseUrl + `/requestBook`, {
      student_id: this.user._id,
      book_id: id
    })
  }

  getUserBorrowedBooks(): Observable<IApiResponse<IStudentBooks[]>> {
    return this.httpClient.get<IApiResponse<IStudentBooks[]>>(this.baseUrl + `/userBooks/${this.user._id}`)
  }

  getAllBookRequests(): Observable<IApiResponse<IStudentBooks[]>> {
    return this.httpClient.get<IApiResponse<IStudentBooks[]>>(this.baseUrl + `/allBookRequests`)
  }

  approveBookRequest(body: any): Observable<IApiResponse<any>> {
    return this.httpClient.put<IApiResponse<any>>(this.baseUrl + `/approveBookRequest`, body)
  }
}
