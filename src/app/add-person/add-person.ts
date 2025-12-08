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

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  save(): void {
    this.personService.add(this.person);
    this.router.navigate(['/']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
