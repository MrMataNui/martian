import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Martian';
  navLinks = ['Phonology', 'Grammar', 'Dictionary'];
  ids = {
    phonology: 'nav-phon',
    grammar: 'nav-grammar' ,
    dictionary: 'nav-lexi'
  };
  low = (item: string) => item.toLowerCase();

}
