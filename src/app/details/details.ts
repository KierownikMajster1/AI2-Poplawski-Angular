import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../personservice';
import { Person } from '../models/person';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class DetailsComponent implements OnInit {
  person$!: Observable<Person | null>;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.person$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const idParam = params.get('id');
        const id = idParam !== null ? Number(idParam) : NaN;

        if (isNaN(id)) {
          this.errorMessage = 'Nieprawidłowy identyfikator osoby.';
          return of(null);
        }

        this.errorMessage = '';
        return this.personService.getById(id).pipe(
          catchError((err) => {
            console.error('GET /persons/{id} error', err);
            this.errorMessage =
              'Nie znaleziono osoby o podanym identyfikatorze.';
            return of(null);
          })
        );
      })
    );
  }

  back(): void {
    this.router.navigate(['/']);
  }
}
