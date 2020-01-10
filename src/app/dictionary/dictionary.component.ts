// tslint:disable:forin
import { Component, OnInit } from '@angular/core';
import { dictionary, Romanization, soundSymbols, SoundSymbols, Dictionary, GerSymbols } from './dictionary.modal';

@Component({
	selector: 'app-dictionary',
	templateUrl: './dictionary.component.html',
	styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
	constructor() {
		this.romanize = this.romanize.bind(this);
		this.langSorter = this.langSorter.bind(this);
	}

	englishRomanization: Romanization[];
	martianShow: boolean;
	englishShow: boolean;
	newTable: Romanization[];
	allTable: Romanization[];
	symbols: string[] = [ ...soundSymbols.map(letter => letter.letter) ];
	romanization: string[] = [ ...soundSymbols.map(letter => letter.Romanization) ];
	symbols1: GerSymbols[] = [];
	symbols2: GerSymbols[] = [];
	soundSymbols: SoundSymbols[] = soundSymbols;
	marsTable: Romanization[];

	firstWord: { letter: string, word: Romanization }[] = [];
	getAllWords: { letter: string, words: Romanization[] }[] = [];

	martianBool: boolean[] = [true, false];
	englishBool: boolean[] = [false, true];

	capitalize = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);
	sorter = (a: string, b: string): number => (a < b) ? -1 : (a > b) ? 1 : 0;

	dicionaryClick(event: any) {
	[this.martianShow, this.englishShow] = (event.target.id === 'show-martian')
		? this.martianBool : this.englishBool;
	}

	langSorter(a: Romanization, b: Romanization): number {
		const [c, d]: string[] = (a.IPA) ? [a.Martian, b.Martian] : [a.English, b.English];
		return this.sorter(c, d);
	}

	romanize(getWord: Dictionary): Romanization {
		const getMartian: string[] = getWord.Martian.split('');
		let getRom = '';
		let getIPA = '';
		let soundLetter: string | { sound: string; letter: string; Romanization: string };
		for (const MartianLetter in getMartian) {
			for (soundLetter in soundSymbols) {
				soundLetter = soundSymbols[soundLetter];
				switch (getMartian[MartianLetter]) {
					case soundLetter.letter:
						getRom += soundLetter.Romanization;
						getIPA += soundLetter.sound;
						break;
					case ',': getRom += ', '; getIPA += ' '; break;
					case ' ': getRom += ' '; getIPA += ' '; break;
				}
			}
		}
		[getIPA, getRom] = this.romanizationChange(getIPA, getRom);
		return { ...getWord, Romanization: getRom, IPA: getIPA };
	}

	private romanizationChange(getIPA: string, getRom: string): string[] {
		if (/ci/g.test(getIPA)) { getIPA = getIPA.replace(/ci/g, 'ki'); }
		if (/kyi/g.test(getRom)) { getRom = getRom.replace(/kyi/g, 'ki'); }

		if (/sŋ/g.test(getIPA)) { getIPA = getIPA.replace(/sŋ/g, 'ŋ'); }
		if (/sng/g.test(getRom)) { getRom = getRom.replace(/sng/g, 'ng'); }

		if (/ʃʒ/g.test(getIPA)) { getIPA = getIPA.replace(/ʃʒ/g, 'ʒ'); }
		if (/shzh/g.test(getRom)) { getRom = getRom.replace(/shzh/g, 'zh'); }

		if (/c$/.test(getIPA)) { getIPA = getIPA.replace(/c$/, 'k'); }
		if (/ky$/.test(getRom)) { getRom = getRom.replace(/ky$/, 'k'); }

		if (/ɲ$/.test(getIPA)) { getIPA = getIPA.replace(/ɲ$/, 'ŋ'); }
		if (/ny$/.test(getRom)) { getRom = getRom.replace(/ny$/, 'ng'); }

		if (/(, )+/g.test(getRom)) { getRom = getRom.replace(/(, )+/g, '$1'); }
		if (/ +/g.test(getRom)) { getRom = getRom.replace(/ +/g, ' '); }
		if (/ +/g.test(getIPA)) { getIPA = getIPA.replace(/ +/g, ' '); }
		return [getIPA, getRom];
	}

	changeLang(lang: string): void {
		this.newTable.sort((a, b) => {
		return	(lang === 'English')
			? this.sorter(a.English, b.English)
			: this.sorter(a.Martian, b.Martian);
		});
	}

	wordSort(lang: Romanization[], symbols: string[]): void {
		let wordGet: Romanization[];
		for (const letter of symbols) {
			wordGet = [];
			for (const word of lang) {
				if (letter === word.Martian.charAt(0)) { wordGet.push(word); }
			}
			this.getAllWords.push({ letter, words: wordGet });
			this.firstWord.push({ letter, word: wordGet[0] });
		}
	}

	ngOnInit() {
		[this.martianShow, this.englishShow] = this.martianBool;
		this.allTable = dictionary
			.map(this.romanize)
			.sort(this.langSorter);

		this.symbols = this.symbols.sort(this.sorter);

		this.wordSort(this.allTable, this.symbols);
		this.newTable = this.getAllWords[0].words;

		if (this.symbols.length % 2) { this.symbols.push(''); }
		const symbolLength: number = this.symbols.length / 2;

		const getSym = {
			row1: this.symbols.slice(0, symbolLength),
			row2: this.symbols.slice(symbolLength)
		};

		const getRom = {
			row1: this.romanization.slice(0, symbolLength),
			row2: this.romanization.slice(symbolLength)
		};

		for (let i = 0; i < symbolLength; i++) {
			this.symbols1.push({ letter: getSym.row1[i], romanization: getRom.row1[i] });
			this.symbols2.push({ letter: getSym.row2[i], romanization: getRom.row2[i] });
		}
	}
}
