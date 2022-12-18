import {Injectable} from '@angular/core';

import jwt_decode from 'jwt-decode'
import {environment} from 'src/environments/environment';
import {IUser} from "../models/IUser";

@Injectable({
  providedIn: 'root'
})
export class DecodeTokenService {


  private tokenToReturn = {first_name: '', last_name: '', userId: '', email: '', contact_number: '', designation: '',student_id: '' , role: '', tokenExpiration: 0};
  private decodedToken: any

  constructor() {
  }

  decode(token: string): any {
    try {
      this.decodedToken = jwt_decode(token);
      // console.log('decode', this.decodedToken);
      if (this.decodedToken) {
        this.tokenToReturn.email = this.decodedToken?.email;
        this.tokenToReturn.userId = this.decodedToken?._id
        this.tokenToReturn.designation = this.decodedToken?.designation
        this.tokenToReturn.role = this.decodedToken?.role
        this.tokenToReturn.contact_number = this.decodedToken?.contact_number
        this.tokenToReturn.first_name = this.decodedToken?.first_name
        this.tokenToReturn.last_name = this.decodedToken?.last_name
        this.tokenToReturn.student_id = this.decodedToken?.student_id
        this.tokenToReturn.tokenExpiration = this.decodedToken?.exp
        return this.tokenToReturn;
      }
    } catch (e) {
      console.error('token error', e);
    }
  }

  setUser(decodedToken: any) {
    const model = {} as IUser;
    model.email = decodedToken.email;
    model._id = decodedToken.userId;
    model.contact_number = decodedToken.contact_number;
    model.designation = decodedToken.designation;
    model.student_id = decodedToken.student_id;
    model.role = decodedToken.role
    model.designation = decodedToken.designation
    model.first_name = decodedToken.first_name
    model.last_name = decodedToken.last_name
    model.tokenExpiry = this.getTokenExpirationDate();
    // console.log(model);
    return model
  }

  getUser(): IUser {
    return this.setUser(this.decode(this.getToken()))
  }

  private getTokenExpirationDate(token?: string): Date {
    console.log('getTokenExpirationDate')
    token = token || this.getToken()
    console.log({token})
    // @ts-ignore
    const decoded = this.decode(token);

    // @ts-ignore
    if (decoded.tokenExpiration === undefined) return null;

    const date = new Date(0);
    // console.log('expiry: ', decoded.tokenExpiration)
    date.setUTCSeconds(decoded.tokenExpiration);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return true;
    return !(date.valueOf() > new Date().valueOf());
  }

  getToken(): any {
    let token = null;
    try {
      token = localStorage.getItem(environment.authTokenKey);
    } catch (err) {
      return false
    }
    return token;
  }
}
