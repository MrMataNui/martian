import { Component, Input, OnInit } from '@angular/core';
import {
	NewLang,
	marsDitionary,
	capitalize,
	getIPA,
	erWordsDefaults,
	istWordsDefaults,
	ionWordsDefaults,
	ingWordsDefaults
} from '../dictionary';
import {
	personCheck,
	plurCheck,
	GetAffix,
	AllWords,
	ingCheck,
	ionCheck,
	blankSpace,
	getTrim,
	addBlank,
	Translation,
	replaceIPA,
	MartianWord,
	MartianIPA
} from './translate.model';

interface BoolCheck {
	ing: boolean;
	ion: boolean;
	plur: boolean;
	person: boolean;
}

@Component({
	selector: 'app-translate',
	templateUrl: './translate.component.html',
	styleUrls: ['./translate.component.css']
})

export class TranslateComponent implements OnInit {
	constructor() { }
	showTranslator = true;
	@Input() engLang = 'Start typing to see the translation of the words';
	translation: Translation;

	testDisplay = (testVar: boolean | string, display: string): { display: string } => ({
		display: (testVar) ? display : 'none'
	})

	addMorph(newVar: string, newVar2: string, wordLoc: number): string {
		const varArray = newVar.split(' ');
		varArray.splice(wordLoc, 0, newVar2);
		newVar = varArray.join(' ');
		return newVar;
	}

	getBlanks(allWords: AllWords, obj: MartianIPA): AllWords {
		// allWords.getPartOfSpeech += addBlank(obj.POS);
		allWords.wordOrder += addBlank(obj.English);
		allWords.langText += addBlank(obj.Martian);
		allWords.langIPA += addBlank(obj.IPA);
		return allWords;
	}

	getRegex(userWord: string[], English: string): void {
		const regex = new RegExp(userWord + ' ');
		const regex2 = /[\(\)]/.test(English);
		if (regex.test(English)) {
			console.log('regex', regex);
			console.log('regex2', `"${regex2}"`);
			console.log('English', `"${English}"`);
		}
	}

	wordStyle(wordType: string, boolCheck: BoolCheck, userWord: string, wordType2?: string): boolean {
		const defaults = {
			er: erWordsDefaults,
			ist: istWordsDefaults,
			ing: ingWordsDefaults,
			ion: ionWordsDefaults,
		};
		const type = (wordType2) ? wordType2 : wordType;
		const check1 = boolCheck[type];
		const check2 = !defaults[type]
			.includes(userWord);
		const check3 = new RegExp(type);
		const newCheck3 = check3.test(userWord);
		return (check1 && check2 && newCheck3);
	}

	wordStyle2(getPlurCheck: boolean, English: string, userWord: string): boolean {
		if (English) {
			if (/\(/.test(English)) { English = English.replace(/\(/, '\\('); }
			if (/\)/.test(English)) { English = English.replace(/\)/, '\\)'); }
			const wordCheck = new RegExp(`^${English}e?s$`).test(userWord);
			return (getPlurCheck && wordCheck);
		}
	}

	blanks(allWords: AllWords, getNewWord: MartianIPA, userWord: string) {
		const newWords = this.getBlanks(allWords, getNewWord);
		const prevWord = userWord;
		return { findWords: newWords, getPrevWord: prevWord };
	}

	translate(text: string): Translation {
		const getWords: MartianWord[] = [];
		text = text.toLowerCase();
		const userText: string[] = text.split(blankSpace);
		userText.forEach((userWord, i) => {
			userText[i] = (userWord !== 'i') ? userText[i] : 'I';
		});

		const wordDefaults: AllWords = {
			langText: '',
			langIPA: '',
			wordOrder: '',
			getPartOfSpeech: '',
		};

		const allWords: AllWords = wordDefaults;
		let newWords: AllWords = wordDefaults;
		const newWordMorph: { getWord: GetAffix, wordLoc: number }[] = [];
		let index = 0;
		userText.forEach(userWord => {
			let prevWord: string;
			let findIPA: MartianIPA;
			switch (userWord) {
				case 'are':
					findIPA = replaceIPA({ Martian: 'MA', English: userWord });
					newWords = this.getBlanks(allWords, findIPA);
					prevWord = userWord;
					break;
				case 'you':
					findIPA = replaceIPA({ Martian: 'FWZ', English: userWord });
					newWords = this.getBlanks(allWords, findIPA);
					prevWord = userWord;
					break;
				case 'we':
					findIPA = replaceIPA({ Martian: 'NE', English: userWord });
					newWords = this.getBlanks(allWords, findIPA);
					prevWord = userWord;
					break;
				case 'us':
					findIPA = replaceIPA({ Martian: 'E', English: userWord });
					newWords = this.getBlanks(allWords, findIPA);
					prevWord = userWord;
					break;
				case 'he':
				case 'she':
					findIPA = replaceIPA({ Martian: 'AZ', English: 'they' });
					newWords = this.getBlanks(allWords, findIPA);
					prevWord = userWord;
					break;
				default:
					const boolCheck: BoolCheck = { ing: true, ion: true, plur: true, person: true };
					marsDitionary.forEach(newLangWord => {
						const { English, Martian } = newLangWord;
						let newIPA: MartianIPA;
						if (English !== prevWord) {
							switch (true) {
								case userWord === English:
									getWords.push({ Martian, English });
									newIPA = replaceIPA({ Martian, English });
									newWords = this.getBlanks(allWords, newIPA);
									prevWord = userWord;
									break;
								case boolCheck.plur && userWord === English + 's':
								case boolCheck.plur && userWord === English + 'es':
									newWordMorph.push({
										getWord: plurCheck(userWord),
										wordLoc: index
									});
									prevWord = userWord;
									boolCheck.plur = !boolCheck.plur;
									break;
								case this.wordStyle('ing', boolCheck, userWord):
									newWordMorph.push({
										getWord: ingCheck(userWord),
										wordLoc: index
									});
									boolCheck.ing = !boolCheck.ing;
									break;
								case this.wordStyle('ion', boolCheck, userWord):
									newWordMorph.push({
										getWord: ionCheck(userWord),
										wordLoc: index
									});
									boolCheck.ion = !boolCheck.ion;
									break;
								case this.wordStyle('person', boolCheck, userWord, 'ist'):
								case this.wordStyle('person', boolCheck, userWord, 'er'):
									newWordMorph.push({
										getWord: personCheck(userWord),
										wordLoc: index
									});
									prevWord = userWord;
									boolCheck.person = !boolCheck.person;
									break;
							}
						}
					});
			}
			const notGet = ['the', 'are', 'is', 'were', 'was'];
			let getBool = true;
			if (notGet.includes(userWord)) { getBool = false; }
			if (getBool) { index++; }
		});

		newWords.langIPA = newWords.langIPA.replace(/\//g, '');
		const trim: AllWords = getTrim(newWords);
		newWordMorph.forEach(word => {
			const { wordLoc, getWord } = word;
			if (getWord.lang && getWord.lang.IPA) {
				getWord.lang.IPA = getWord.lang.IPA.replace(/\//g, '');
				trim.langIPA = this.addMorph(trim.langIPA, getWord.lang.IPA, wordLoc);
				trim.langText = this.addMorph(trim.langText, getWord.lang.word, wordLoc);
				trim.wordOrder = this.addMorph(trim.wordOrder, getWord.English, wordLoc);
			}
		});
		return {
			display: this.testDisplay(this.engLang, 'block'),
			english: capitalize(trim.wordOrder),
			martian: trim.langText,
			IPA: getIPA(trim.langIPA),
		};
	}

	ngOnInit() { }
}
