import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class ListComponent {
  newItem: string = '';
  items: string[] = [];

  addItem(): void {
    const trimmed = this.newItem.trim();
    if (!trimmed) {
      return;
    }
    this.items.push(trimmed);
    this.newItem = '';
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }
}
