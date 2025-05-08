import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {data} from "autoprefixer";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private API_URL = environment.BACKEND_API_uRL;

  constructor(
    private httpClient: HttpClient
  ) {
  }


  getResource(subUrl: string): Observable<any> {
    return this.httpClient.get(this.API_URL + subUrl)
  }

  putResource(subUrl: string, data: any): Observable<any> {
    return this.httpClient.put(this.API_URL + subUrl, data);
  }

  deleteResource(subUrl: string): Observable<any> {
    return this.httpClient.delete(this.API_URL + subUrl);
  }

  createResource(subUrl: string, data: any): Observable<any> {
    return this.httpClient.post(this.API_URL + subUrl, data)
  }

}
