import { Injectable } from '@angular/core';
import { Person } from './models/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private storageKey = 'persons';

  private loadAllInternal(): Person[] {
    const json = localStorage.getItem(this.storageKey);
    if (!json) {
      return [];
    }
    try {
      const data = JSON.parse(json);
      return Array.isArray(data) ? (data as Person[]) : [];
    } catch (e) {
      console.error('Błąd parsowania danych z LocalStorage', e);
      return [];
    }
  }

  private saveAllInternal(people: Person[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(people));
  }

  getAll(): Person[] {
    return this.loadAllInternal();
  }

  getByIndex(index: number): Person | null {
    const people = this.loadAllInternal();
    if (index < 0 || index >= people.length) {
      return null;
    }
    return people[index];
  }

  add(person: Person): void {
    const people = this.loadAllInternal();
    people.push(person);
    this.saveAllInternal(people);
  }

  delete(index: number): void {
    const people = this.loadAllInternal();
    if (index < 0 || index >= people.length) {
      return;
    }
    people.splice(index, 1);
    this.saveAllInternal(people);
  }
}
