import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../models/person';
import { PersonService } from '../personservice';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class DetailsComponent implements OnInit {
  person: Person | null = null;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const id = idParam !== null ? Number(idParam) : NaN;

      if (isNaN(id)) {
        this.errorMessage = 'Nieprawidłowy identyfikator osoby.';
        this.person = null;
        return;
      }

      this.errorMessage = '';
      this.personService.getById(id).subscribe({
        next: (p) => (this.person = p),
        error: () => {
          this.errorMessage = 'Nie znaleziono osoby o podanym identyfikatorze.';
          this.person = null;
        },
      });
    });
  }

  back(): void {
    this.router.navigate(['/']);
  }
}
