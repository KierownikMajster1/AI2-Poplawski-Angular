import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PersonService } from '../personservice';
import { Person } from '../models/person';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class ListComponent implements OnInit {
  people: Person[] = [];
  errorMessage = '';

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.errorMessage = '';
    this.personService.getAll().subscribe({
      next: (data) => (this.people = data),
      error: () => (this.errorMessage = 'Błąd podczas wczytywania danych z serwera.'),
    });
  }

  goToAdd(): void {
    this.router.navigate(['/add']);
  }

  delete(person: Person): void {
    if (!person.id) return;

    this.errorMessage = '';
    this.personService.delete(person.id).subscribe({
      next: () => this.load(),
      error: () => (this.errorMessage = 'Błąd podczas usuwania osoby.'),
    });
  }
}
