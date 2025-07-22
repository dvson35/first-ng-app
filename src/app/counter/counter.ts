import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css'
})
export class Counter {
  counterValue = signal(0);

  incrementValue(){
    this.counterValue.update((val) => val + 1);
  }

  decrementValue(){
    this.counterValue.update((val) => val - 1);
  }

  resetValue(){
    this.counterValue.set(0);
  }
}
