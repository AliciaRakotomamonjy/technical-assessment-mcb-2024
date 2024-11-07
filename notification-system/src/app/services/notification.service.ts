import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private dynamicsApiUrl = 'https://org7c730ca8.crm4.dynamics.com//api/data/v9.0/';

  constructor(private http: HttpClient) {}

  getNotifications(fetchXmlQuery: string): Observable<any> {
    const url = `${this.dynamicsApiUrl}leads?fetchXml=${encodeURIComponent(fetchXmlQuery)}`;
    return this.http.get(url);
  }
}
