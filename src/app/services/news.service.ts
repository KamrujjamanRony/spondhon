import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly dataService = inject(DataService);

  private apiCall<T>(endpoint: string, method: 'get' | 'post' | 'put' | 'delete', body?: any): Observable<T> {
    return this.dataService.getPort().pipe(
      switchMap(port => {
        const url = `${port}/news${endpoint}`;
        return this.http.request<T>(method, url, { body });
      })
    );
  }

  addNews(model: any | FormData): Observable<void> {
    return this.apiCall<void>('', 'post', model);
  }

  getAllNews(): Observable<any> {
    return this.apiCall<any>('', 'get');
  }

  getNewsById(query: string): Observable<any> {
    return this.apiCall<any>(`/${query}`, 'get');
  }

  getNews(query: string): Observable<any> {
    return this.apiCall<any>(`/category/${query}`, 'get');
  }

  updateNews(id: string | number, updateNewsRequest: any | FormData): Observable<any> {
    return this.apiCall<any>(`/${id}`, 'put', updateNewsRequest);
  }

  deleteNews(id: string | number): Observable<any> {
    return this.apiCall<any>(`/${id}`, 'delete');
  }
}
