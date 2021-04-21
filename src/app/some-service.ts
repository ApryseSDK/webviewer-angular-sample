import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SomeService {
  private someSubject$: Subject<number> = new Subject<number>();
  constructor(private readonly http: HttpClient) {

  }

  emitSomething(param: number) {
    this.someSubject$.next(param);
  }

  getSomething$(): Observable<number> {
    return this.someSubject$.asObservable();
  }

  getSomething2$(): Observable<object> {
    return this.http.get('https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf', { responseType: 'blob'}).pipe();
  }
}