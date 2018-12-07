import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { promise } from 'protractor';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getLeaders(): Observable<Leader[]> {
      return this.http.get<Leader[]>(baseURL + 'leadership')
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

      getLeader(id: number): Observable<Leader> {
        return this.http.get<Leader>(baseURL + 'leadership/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
      }

      getFeaturedLeader(): Observable<Leader> {
        return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
          .pipe(map(leaders => leaders[0]))
          .pipe(catchError(this.processHTTPMsgService.handleError));
      }
}
