import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from '../models/person';
import { PersonService } from '../personservice';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-person.html',
  styleUrl: './add-person.css',
})
export class AddPersonComponent {
  person: Person = {
    address: {},
  };

  errorMessage = '';

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  save(): void {
    console.log('SAVE CLICKED', this.person); 
    this.errorMessage = '';

    this.personService.add(this.person).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Add error', err);
        this.errorMessage = 'Błąd podczas zapisu danych.';
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
