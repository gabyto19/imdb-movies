import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, retryWhen, delayWhen, take, tap, scan } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.apiUrl;
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) { }

  searchMovies(title: string): Observable<any> {
    const cachedResult = this.cache.get(title);
    if (cachedResult) {
      return of(cachedResult);
    }

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': environment.apiKey
    });

    return this.http.get(`${this.apiUrl}?title=${title}&limit=20`, { headers })
      .pipe(
        tap(result => this.cache.set(title, result)),
        catchError(this.handleError),
        retryWhen(errors =>
          errors.pipe(
            scan((retryCount, error) => {
              if (error.status !== 429 || retryCount >= 5) {
                throw error;
              }
              return retryCount + 1;
            }, 0),
            delayWhen(retryCount => timer(retryCount * 1000)) // Exponential backoff
          )
        )
      );
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
