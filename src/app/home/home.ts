import { Component, signal } from '@angular/core';
import { Greeting } from '../greeting/greeting';
import { Counter } from '../counter/counter';

@Component({
  selector: 'app-home',
  imports: [Greeting, Counter],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  homeMessage = signal('Hello, World of Home Component!');

  keyUpHandler(event: KeyboardEvent){
    console.log(`user pressed the ${event.key} key`);
  }
}
