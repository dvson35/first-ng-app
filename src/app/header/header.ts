import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodosService } from '../services/todos';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  title = 'My First Angular App';
}
