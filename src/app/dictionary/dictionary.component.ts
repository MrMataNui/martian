// tslint:disable:forin
import { Component, OnInit } from '@angular/core';
import { dictionary, English, Martian, Romanization } from './dictionary.modal';
import { soundSymbol } from '../dictionary.min';

@Component({
	selector: 'app-dictionary',
	templateUrl: './dictionary.component.html',
	styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
	constructor() { this.englishRomanization = this.englishRomanization.bind(this); }
	martianRom: Romanization[];
	englishRom: Romanization[];
	martianShow = !0; englishShow = !1;

	dicionaryClick(event: any) {
		switch (event.target.id) {
			case 'show-martian': this.martianShow = !0; this.englishShow = !1; break;
			case 'show-english': this.martianShow = !1; this.englishShow = !0; break;
		}
	}
	sorter(a: any, b: any): number {
		[a, b] = (a.IPA) ? [a.Martian, b.Martian] : [a.English, b.English];
		return (a < b) ? -1 : 1;
	}

	getMartianDictionary(martian: Romanization[]): string {
		let martianDicionary = '';
		for (const word in martian) {
			martianDicionary += `<li>
				<span class="martian">${martian[word].Martian}</span> <b>|</b>
				<span class="rom">(${martian[word].romanization})</span> <b>|</b>
				/<span class="ipa">${martian[word].IPA}</span>/ <b>|</b>
				<span class="pos">${martian[word].POS}</span> <b>|</b>
				<b>${martian[word].English}</b>
			</li>`;
		}
		return martianDicionary;
	}

	getEnglishDictionary(english: Romanization[]): string {
		let englishDicionary = '';
		for (const word in english) {
			if (english[word].English === 'i') { english[word].English = 'I'; }
			let wordGet = `<b>${english[word].English}</b>
				<b>|</b> <span class="pos">${english[word].POS}</span>
				<b>|</b> <span class="martian">${english[word].Martian}</span>
				<b>|</b> <span class="rom">(${english[word].romanization})</span>`;

			const template = (POS: string, martianWord: string) => `
				<b>|</b> <span class="pos">${POS}</span>
				<b>|</b> <span class="martian">${martianWord}</span>`;
			if (english[word].POS2) {
				wordGet += template(english[word].POS2, english[word].Martian2);
				if (english[word].POS3) {
					wordGet += template(english[word].POS3, english[word].Martian3);
					if (english[word].POS4) {
						wordGet += template(english[word].POS4, english[word].Martian4);
					}
				}
			}
			englishDicionary += `<li> ${wordGet} </li>`;
		}
		return englishDicionary;
	}

	englishRomanization(getWord: English | Martian): Romanization {
		const getMartian: string[] = getWord.Martian.split('');
		let getRom = '';
		let getIPA = '';
		let soundLetter: string | { sound: string; letter: string; romanization: string; };
		for (const MartianLetter in getMartian) {
			for (soundLetter in soundSymbol) {
				soundLetter = soundSymbol[soundLetter];
				switch (getMartian[MartianLetter]) {
					case soundLetter.letter:
						getRom += soundLetter.romanization;
						getIPA += soundLetter.sound;
						break;
					case ',': getRom += ', '; getIPA += ' '; break;
					case ' ': getRom += ' '; getIPA += ' '; break;
				}
			}
		}
		[getIPA, getRom] = this.romanizationChange(getIPA, getRom);
		return { ...getWord, romanization: getRom, IPA: getIPA };
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

	ngOnInit() {
		const { martian, english } = dictionary;
		martian.sort(this.sorter);
		english.sort(this.sorter);
		this.martianRom = martian.map(this.englishRomanization);
		this.englishRom = english.map(this.englishRomanization);
	}
}
