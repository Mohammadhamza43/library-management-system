import {IBook} from "./IBook";
import {IUser} from "../../../../shared/models/IUser";

export interface IStudentBooks {
  _id?: string;
  student_id?: IUser;
  book_id?: IBook;
  request_date?: string;
  issuance_date?: string;
  return_date?: string;
  charges?: number;
  request_status?: string;
  __v?: number;
}
