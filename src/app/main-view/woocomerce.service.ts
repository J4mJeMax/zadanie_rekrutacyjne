import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {
  private baseUrl = 'https://llhysynjlo.cfolks.pl/wp-json/wc/v3';
  private consumerKey = 'ck_a2670c437d6b7d9a142b49f457d2ff2c98938d47';
  private consumerSecret = 'cs_364a026e37d0608d33d9ef98a24d8ad328a1c862';

  getOrders(orderId?: number): Observable<any> {
    const url = `${this.baseUrl}/orders`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${this.consumerKey}:${this.consumerSecret}`)}`
    });

    if (orderId) {
      const params = new HttpParams().set('include', orderId);
      return this.http.get(url, { headers, params });
    } else {
      return this.http.get(url, { headers });
    }
  }

  constructor(private http: HttpClient) { }
}
