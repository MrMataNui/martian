import { Component, OnInit } from '@angular/core';
import { marsDitionary, soundSymbol } from '../dictionary';
import { Symbols } from './data.modal';
@Component({
	selector: 'app-data',
	templateUrl: './data.component.html',
	styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
	constructor() { }
	symbolNum: number;
	symbolOccourances: Symbols[];
	ngOnInit(): void {
		const newLanguageTable: string[] = marsDitionary.map(get => get.Martian);
		const symbolNum: Symbols[] = [
			...soundSymbol.map(letter => ({
				symbol: letter.letter,
				letter: letter.Romanization,
				count: 0
			}))
		];
		newLanguageTable.forEach(word => {
			symbolNum.forEach(symbol => {
				for (const letter of word) {
					if (letter === symbol.symbol) { symbol.count++; }
				}
			});
		});
		this.symbolNum = symbolNum.length;
		this.symbolOccourances = symbolNum.sort((a, b) => (a.count > b.count) ? -1 : 1);
	}
}
