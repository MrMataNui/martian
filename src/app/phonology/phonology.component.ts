import { Component, OnInit } from '@angular/core';
import { soundSymbol } from '../dictionary.min';
@Component({
  selector: 'app-phonology',
  templateUrl: './phonology.component.html',
  styleUrls: ['./phonology.component.css']
})
export class PhonologyComponent implements OnInit {

  constructor() { }
  getSpellingRules() {
    let sounds = '<th> Sound </th>';
    let romanization = '<th> Romanization </th>';
    let letters = '<th> Letter </th>';
    soundSymbol.forEach(word => {
      sounds += `<td> <span class="ipa">/${word.sound}/</span> </td>`;
      romanization += `<td> ${word.romanization} </td>`;
      letters += `<td> <span class="martian">${word.letter}</span> </td>`;
    });
    const html = `<table> <tr>${letters}</tr> <tr>${romanization}</tr> <tr>${sounds}</tr> </table>`;
    // $('#spell-rules-data').html(html);
    // console.log('html', html);
    return html;
  }
  ngOnInit() {}
}
