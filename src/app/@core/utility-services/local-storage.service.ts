import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LocalStorageIntercept {
  private value = new BehaviorSubject('');
  updatedValue = this.value.asObservable();

  set(key: string, value: string): void {
    this.value.next(key);
    localStorage.setItem(key, value);
  }

  get(key: string): string {
    return localStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
