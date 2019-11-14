// tslint:disable:forin
import { Component, OnInit } from '@angular/core';
import { dictionary, Romanization, soundSymbols, SoundSymbols, Dictionary, GerSymbols } from './dictionary.modal';

@Component({
	selector: 'app-dictionary',
	templateUrl: './dictionary.component.html',
	styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
	constructor() { this.romanize = this.romanize.bind(this); }

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

	getMartian: boolean[] = [true, false];
	getEnglish: boolean[] = [false, true];

	capitalize = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);
	sorter = (a: string, b: string): number => (a < b) ? -1 : (a > b) ? 1 : 0;

	dicionaryClick(event: any) {
		switch (event.target.id) {
			case 'show-martian': [this.martianShow, this.englishShow] = this.getMartian; break;
			case 'show-english': [this.martianShow, this.englishShow] = this.getEnglish; break;
		}
	}

	langSorter(a: Romanization, b: Romanization): number {
		const [c, d] = (a.IPA) ? [a.Martian, b.Martian] : [a.English, b.English];
		return c < d ? -1 : 1;
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

	tableStructure = (get): Romanization => ({
		Martian: get.Martian,
		Romanization: (get.Romanization) ? get.Romanization : '',
		IPA: (get.IPA) ? get.IPA : '',
		POS: get.POS,
		English: get.English,
		POS2: (get.POS2) ? get.POS2 : '',
		Martian2: (get.Martian2) ? get.Martian2 : '',
		POS3: (get.POS3) ? get.POS3 : '',
		Martian3: (get.Martian3) ? get.Martian3 : '',
		POS4: (get.POS4) ? get.POS4 : '',
		Martian4: (get.Martian4) ? get.Martian4 : ''
	})

	changeLang(lang: string): void {
		switch (lang) {
			case 'English': this.newTable.sort((a, b) => this.sorter(a.English, b.English)); break;
			case 'Lang': this.newTable.sort((a, b) => this.sorter(a.Martian, b.Martian)); break;
		}
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
		[this.martianShow, this.englishShow] = this.getMartian;
		this.englishRomanization = dictionary
			.map(this.romanize)
			.sort(this.langSorter);

		this.allTable = this.englishRomanization
			.map(this.tableStructure)
			.sort((a, b) => this.sorter(a.Martian, b.Martian));

		this.symbols = this.symbols.sort(this.sorter);

		this.wordSort(this.allTable, this.symbols);
		this.newTable = this.getAllWords[0].words;
		// console.log('this.getAllWords', this.getAllWords);

		if (this.symbols.length % 2) { this.symbols.push(''); }
		const symbolLength: number = this.symbols.length / 2;

		const getSym = [
			this.symbols.slice(0, symbolLength),
			this.symbols.slice(symbolLength)
		];

		const getRom = [
			this.romanization.slice(0, symbolLength),
			this.romanization.slice(symbolLength)
		];

		for (let i = 0; i < symbolLength; i++) {
			this.symbols1.push({ letter: getSym[0][i], romanization: getRom[0][i] });
			this.symbols2.push({ letter: getSym[1][i], romanization: getRom[1][i] });
		}
	}
}
