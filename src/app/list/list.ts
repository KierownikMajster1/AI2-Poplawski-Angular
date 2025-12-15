import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PersonService } from '../personservice';
import { Person } from '../models/person';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class ListComponent implements OnInit {
  people$!: Observable<Person[]>;
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
    this.people$ = this.personService.getAll().pipe(
      catchError((err) => {
        console.error('GET /persons error', err);
        this.errorMessage = 'Błąd podczas wczytywania danych z serwera.';
        return of([] as Person[]);
      })
    );
  }

  goToAdd(): void {
    this.router.navigate(['/add']);
  }

  delete(person: Person): void {
    if (!person.id) {
      return;
    }
    this.personService.delete(person.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        console.error('DELETE error', err);
        this.errorMessage = 'Błąd podczas usuwania osoby.';
      },
    });
  }
}
