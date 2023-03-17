import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shape } from '../models/shape.model';

@Injectable({
  providedIn: 'root'
})


export class ShapesService {

  private apiUrl = 'https://localhost:7189/userInput';

  constructor(private http: HttpClient) { }


  sendUserInputAPI(Input: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify({ Input });
    return this.http.post<Shape>(this.apiUrl, body, httpOptions);
  }


}
