import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RandomService } from '../random';

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random.html',
  styleUrl: './random.css',
})
export class RandomComponent {
  @Input() max: number = 10;

  currentValue: number | null = null;
  comment: string = '';
  commentClass: 'low' | 'high' | '' = '';

  constructor(private randomService: RandomService) {}

  generate(): void {
    if (this.max <= 0) {
      this.currentValue = null;
      this.comment = 'max musi być dodatnie';
      this.commentClass = 'high';
      return;
    }

    const value = this.randomService.getRandom(this.max);
    this.currentValue = value;

    const threshold = 0.5 * this.max;
    if (value <= threshold) {
      this.comment = `Wylosowana liczba (${value}) jest ≤ 0.5 * max (${threshold}).`;
      this.commentClass = 'low';
    } else {
      this.comment = `Wylosowana liczba (${value}) jest > 0.5 * max (${threshold}).`;
      this.commentClass = 'high';
    }
  }
}
