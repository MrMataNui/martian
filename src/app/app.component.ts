import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Martian';
  navLinks = ['Phonology', 'Grammar', 'Dictionary'];
  ids = {
    phonology: 'nav-phon',
    grammar: 'nav-grammar',
    dictionary: 'nav-lexi'
  };
  low = (item: string) => item.toLowerCase();

  myFunction(navbar: HTMLElement, sticky: number) {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    }

  ngOnInit() {
    const navbar = document.getElementById('head-nav');
    const sticky = navbar.offsetTop;
    window.onscroll = () =>  this.myFunction(navbar, sticky);
  }
}
