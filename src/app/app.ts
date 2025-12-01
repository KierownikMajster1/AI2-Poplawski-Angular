import { Component } from '@angular/core';
import { RandomComponent } from './app/random/random';
import { ListComponent } from './app/list/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RandomComponent, ListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  welcomeText: string = 'Aplikacja Angular';
}
