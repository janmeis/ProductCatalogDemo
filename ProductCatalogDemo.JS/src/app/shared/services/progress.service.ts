import { Injectable } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  isLoading = false;
  private readonly timeSet = environment.progressTimeSet;

  run<T>(observable: Observable<T>): Observable<T> {
    this.isLoading = true;
    return observable.pipe(
      tap(() => this.switchLoading()),
      first());
  }

  private switchLoading = (): Subscription =>
    timer(this.timeSet).pipe(first()).subscribe(() => this.isLoading = false)
}
