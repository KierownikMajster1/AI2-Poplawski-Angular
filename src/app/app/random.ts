import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  getRandom(max: number): number {
    if (max <= 0) {
      throw new Error('max musi być dodatnie');
    }
    return Math.floor(Math.random() * max) + 1;
  }
}
