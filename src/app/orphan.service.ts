import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrphanService {
  private apiUrl = 'http://localhost:3000/orphans'; // Your backend API URL

  constructor(private http: HttpClient) { }

  saveOrphan(orphanData: any): Observable<any> {
    return this.http.post(this.apiUrl, orphanData);  }
    getOrphans()
      : Observable <any>{ 
        return this.http.get(this.apiUrl);
      }  
}
