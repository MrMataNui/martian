import { Component, OnInit } from '@angular/core';
import { Words, Tenses, PartOfSpeech } from './grammar.model';

@Component({
	selector: 'app-grammar',
	templateUrl: './grammar.component.html',
	styleUrls: ['./grammar.component.css']
})
export class GrammarComponent implements OnInit {
	constructor() { }
	subscript = (word: string, type: string): string => `(${word})<sub> <b>${type}</b> </sub> `;
	getBrackets = (getString: string): string => `<b>[ </b> ${getString.trim()} <b> ]</b>`;

	partOfSpeech = (): PartOfSpeech => ({
		Obj: this.subscript('the door', 'Obj'),
		Subj: this.subscript('Mary', 'Sub'),
		Verb: this.subscript('opened', 'Verb'),
		Obl: this.subscript('with a key', 'Obl'),
	})

	word = (): Words => ({
		order: this.getBrackets('Object-Subject-Verb-Oblique'),
		adOrder: this.getBrackets('Adjectives are positioned after the noun'),
		adposition: this.getBrackets('Postpositions'),
	})

	getWordOrder(lang: string): string {
		const { Subj, Verb, Obj, Obl } = this.partOfSpeech();
		switch (lang) {
			case 'English': return this.getBrackets(Subj + Verb + Obj + Obl);
			case 'Martian': return this.getBrackets(Obj + Subj  + Verb + Obl);
		}
	}

	ngOnInit() { }
}
