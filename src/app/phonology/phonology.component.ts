import { Component, OnInit } from '@angular/core';
import { soundSymbol } from '../dictionary';
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
			sounds += `<td> /<span class="ipa">${word.sound}</span>/ </td>`;
			romanization += `<td> ${word.Romanization} </td>`;
			letters += `<td> <span class="martian">${word.letter}</span> </td>`;
		});
		return `<tr>${letters}</tr> <tr>${romanization}</tr> <tr>${sounds}</tr>`;
	}
	ngOnInit() {}
}
