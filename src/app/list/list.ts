import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../personservice';
import { Person } from '../models/person';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class ListComponent implements OnInit {
  people: Person[] = [];

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.people = this.personService.getAll();
  }

  goToAdd(): void {
    this.router.navigate(['/add']);
  }

  goToDetails(index: number): void {
    this.router.navigate(['/details', index]);
  }

  delete(index: number): void {
    this.personService.delete(index);
    this.load();
  }
}
