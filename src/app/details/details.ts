import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../personservice';
import { Person } from '../models/person';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class DetailsComponent implements OnInit {
  person: Person | null = null;
  index: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const idx = idParam !== null ? Number(idParam) : NaN;

      if (isNaN(idx)) {
        this.person = null;
        return;
      }

      this.index = idx;
      this.person = this.personService.getByIndex(idx);
    });
  }

  back(): void {
    this.router.navigate(['/']);
  }
}
