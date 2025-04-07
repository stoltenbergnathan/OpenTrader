import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from './shared/models/trade.model';
import { environment } from '../environments/environment';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tags: Tag[] = [];
  private tagSubject  = new BehaviorSubject<Tag[]>(this.tags);

  tradeEntries$ = this.tagSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.apiUrl}/api/tags`)
      .pipe(
        tap(tags => {
          this.tags = tags;
          this.tagSubject.next(this.tags);
        })
      );
  }
}
