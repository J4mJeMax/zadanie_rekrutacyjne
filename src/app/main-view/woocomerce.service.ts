import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {
  private baseUrl = 'https://llhysynjlo.cfolks.pl/wp-json/wc/v3';
  private consumerKey = 'ck_a2670c437d6b7d9a142b49f457d2ff2c98938d47';
  private consumerSecret = 'cs_364a026e37d0608d33d9ef98a24d8ad328a1c862';

  getProducts(): Observable<any> {
    const url = `${this.baseUrl}/products`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${this.consumerKey}:${this.consumerSecret}`)}`
    });
    return this.http.get(url, { headers });
  }

  getOrders(customerId?: number, fromDate?: string, toDate?: string): Observable<any> {
    const url = `${this.baseUrl}/orders`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${this.consumerKey}:${this.consumerSecret}`)}`
    });
    return this.http.get(url, { headers });
  }

  getClientData(): Observable<any> {
    const url = `${this.baseUrl}/customers`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${this.consumerKey}:${this.consumerSecret}`)}`
    });

    return this.http.get(url, { headers });
  }

  constructor(private http: HttpClient) { }
}
