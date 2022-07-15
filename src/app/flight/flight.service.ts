import { Flight } from './flight';
import { FlightFilter } from './flight-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
const baseUrl = 'http://localhost:8080/api/books';

@Injectable()
export class FlightService {
  flightList: Flight[] = [];

  constructor(private http: HttpClient) {
  }

  // findById(id: string): Observable<Flight> {
  //   const url = `http://www.angular.at/api/flight/${id}`;
  //   const params = { 'id': id };
  //   const headers = new HttpHeaders().set('Accept', 'application/json');
  //   return this.http.get<Flight>(url, {params, headers});
  // }

  // load(filter: FlightFilter): void {
  //   this.find(filter).subscribe(result => {
  //       this.flightList = result;
  //     },
  //     err => {
  //       console.error('error loading', err);
  //     }
  //   );
  // }

  // find(filter: FlightFilter): Observable<Flight[]> {
  //   const url = `http://www.angular.at/api/flight`;
  //   const headers = new HttpHeaders().set('Accept', 'application/json');

  //   const params = {
  //     'from': filter.from,
  //     'to': filter.to,
  //   };

  //   return this.http.get<Flight[]>(url, {params, headers});
  // }

  // save(entity: Flight): Observable<Flight> {
  //   let params = new HttpParams();
  //   let url = '';
  //   const headers = new HttpHeaders().set('content-type', 'application/json');
  //   if (entity.id) {
  //     url = `http://www.angular.at/api/flight/${entity.id.toString()}`;
  //     params = new HttpParams().set('ID', entity.id.toString());
  //     return this.http.put<Flight>(url, entity, {headers, params});
  //   } else {
  //     url = `http://www.angular.at/api/flight`;
  //     return this.http.post<Flight>(url, entity, {headers, params});
  //   }
  // }

  // delete(entity: Flight): Observable<Flight> {
  //   let params = new HttpParams();
  //   let url = '';
  //   const headers = new HttpHeaders().set('content-type', 'application/json');
  //   if (entity.id) {
  //     url = `http://www.angular.at/api/flight/${entity.id.toString()}`;
  //     params = new HttpParams().set('ID', entity.id.toString());
  //     return this.http.delete<Flight>(url, {headers, params});
  //   }
  //   return EMPTY;
  // }
  

  getAll(): Observable<Flight[]> {
    return this.http.get<Flight[]>(baseUrl);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  findByTitle(title: any): Observable<Flight[]> {
    // return this.http.get<Flight[]>(`${baseUrl}?title=${title}`);
    return this.http.get<Flight[]>(`${baseUrl}/search/${title}`);
  }
}

