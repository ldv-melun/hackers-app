import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupIpService {

  constructor(private http:HttpClient) { }

  public getGeoLocationIp(ip: string) : Observable<any> {
    let url = environment.apiBaseUrl + ip + '/json/' // '?output=json&access_key=' + environment.keyAPI
    console.log("send url : " + url)
    return this.http.get(url);
  }
}
