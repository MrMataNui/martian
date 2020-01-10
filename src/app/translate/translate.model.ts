import { marsDitionary, soundSymbol, NewLang } from '../dictionary';
export interface Affix {
	IPA: string;
	word: string;
	English?: string;
}
export interface NewAffix extends Affix {
	type?: string;
	prefix?: string;
	suffix?: string;
}
export interface GetAffix {
	lang: Affix;
	English: string;
}
export interface Prefix extends Affix {
	type?: 'prefix';
	prefix: string;
}
export interface Suffix extends Affix {
	type?: 'suffix';
	suffix: string;
}
export interface AllWords {
	langText: string;
	langIPA: string;
	wordOrder: string;
	getPartOfSpeech: string;
}
export interface Translation {
	display: { display: string; };
	english: string;
	martian: string;
	IPA: string;
}
interface AffixCheck {
	type: string;
	prefix?: string;
	suffix?: string;
}
export function getTrim(obj: AllWords): any {
	const newObj: any = {};
	Object.keys(obj).map(key => {
		newObj[key] = obj[key].trim();
	});
	return newObj;
}
export const blankSpace = ' ';
export const addBlank = (word: string): string => word + blankSpace;

const returnObject = (word: string): GetAffix => ({
	lang: { IPA: '', word: '' },
	English: word,
});

export interface MartianWord { Martian: string; English: string; }
export interface MartianIPA { Martian: string; English: string; IPA: string; }
export const replaceIPA = (word: MartianWord): MartianIPA => {
	let IPA = '';
	for (const letter of word.Martian) {
		soundSymbol.forEach(get => {
			if (letter === get.letter) {
				IPA += get.sound;
			}
		});
	}
	return { ...word, IPA };
};

function getLangPOS(getWord: string): void {
	const partOfSpeech = {
		verbs: [],
		nouns: [],
		adjectives: [],
		pronouns: [],
		adverbs: [],
		determiners: [],
		prepositions: [],
		numbers: [],
		interjections: [],
		conjunctions: [],
		negation: [],
		articles: [],
		r: [],
		c: [],
	};
	marsDitionary.map(langWord => {
		const { POS, English } = langWord;
		switch (POS) {
			case 'verb':
				partOfSpeech.verbs.push(English);
				break;
			case 'noun':
				partOfSpeech.nouns.push(English);
				break;
			case 'adjective':
				partOfSpeech.adjectives.push(English);
				break;
			case 'pronoun':
				partOfSpeech.pronouns.push(English);
				break;
			case 'adverb':
				partOfSpeech.adverbs.push(English);
				break;
			case 'determiner':
				partOfSpeech.determiners.push(English);
				break;
			case 'preposition':
				partOfSpeech.prepositions.push(English);
				break;
			case 'number':
				partOfSpeech.numbers.push(English);
				break;
			case 'interjection':
				partOfSpeech.interjections.push(English);
				break;
			case 'conjunction':
				partOfSpeech.conjunctions.push(English);
				break;
			case 'negation':
				partOfSpeech.negation.push(English);
				break;
			case 'article':
				partOfSpeech.articles.push(English);
				break;
			case 'r.':
				partOfSpeech.r.push(English);
				break;
			case 'c.':
				partOfSpeech.c.push(English);
				break;
		}
	});
}

const addAffix = (newVar: string, obj: NewAffix, IPA?: string): string => {
	switch (obj.type) {
		case 'prefix': return (IPA) ? `${IPA}${newVar}` : `${obj.prefix}${newVar}`;
		case 'suffix': return (IPA) ? `${newVar}${IPA}` : `${newVar}${obj.suffix}`;
	}
};
function getAffix(obj: NewAffix): Affix {
	const suffix = ('suffix' in obj);
	let getWord: Affix;
	marsDitionary.map(newLangWord => {
		const { English, Martian } = newLangWord;
		const getIPA = replaceIPA({ Martian, English });
		let IPA: string = getIPA.IPA;
		if (IPA && English === obj.word) {
			IPA = addAffix(IPA, obj, obj.IPA);
			getWord = {
				IPA: `/${IPA.trim()}/`,
				word: addAffix(Martian, obj),
			};
		}
	});
	return getWord;
}
const getWordAffix = (obj: NewAffix): GetAffix => {
	const lang: AffixCheck = ('prefix' in obj)
		? { type: 'prefix', prefix: obj.prefix }
		: { type: 'suffix', suffix: obj.suffix };
	if ('suffix' in obj) {
	}
	return {
		lang: getAffix({
			...lang,
			IPA: obj.IPA,
			word: obj.word
		}),
		English: obj.English,
	};
};

export function ingCheck(word: string): GetAffix {
	let ingWord: { word: string };
	switch (word) {
		case 'typing':
			ingWord = { word: 'type' }; break;
		case 'doing':
			ingWord = { word: 'do' }; break;
		case 'watering':
			ingWord = { word: 'water' }; break;
		case 'eating':
			ingWord = { word: 'eat' }; break;
		case 'accepting':
			ingWord = { word: 'accept' }; break;
		case 'filming':
			ingWord = { word: 'film' }; break;
		case 'calming':
			ingWord = { word: 'calm' }; break;
		case 'provoking':
			ingWord = { word: 'provoke' }; break;
		case 'blessing':
			ingWord = { word: 'bless' }; break;
		case 'going':
			ingWord = { word: 'go' }; break;
		case 'geting': case 'getting':
			ingWord = { word: 'get' }; break;
		default: return returnObject(word);
	}
	const affix = getWordAffix({ ...ingWord, suffix: 'UN', IPA: '/un/', English: word });
	return affix;
}

export function ionCheck(word: string): GetAffix {
	switch (word) {
		case 'translation':
			return getWordAffix({ word: 'translate', prefix: 'U', IPA: '/u/', English: word });
		default: return returnObject(word);
	}
}

export function plurCheck(word: string): GetAffix {
	let affix: GetAffix;
	switch (word) {
		// case 'words':
		// 	affix = getWordAffix({ word: 'word', suffix: 'OD', IPA: '/ɔʃ/', English: word });
		// 	break;
		default:
			affix = getWordAffix({ word: word.slice(0, -1), suffix: 'HOX', IPA: '/ʔɔʧ/', English: word });
			break;
	}
	return (/e?s$/.test(word)) ? affix : returnObject(word);
}

export function thirdSingular(word: string): NewLang {
	let newIt: {
		Martian: string,
		IPA: string,
		English: string
	};
	switch (word) {
		case 'he': case 'she':
			newIt = { Martian: 'ɥeb', IPA: '/hʷeb/', English: 'it' };
			break;
		case 'him': case 'her':
			newIt = { Martian: 'ꝡᵹ', IPA: '/hʷig/', English: 'it' };
			break;
		case 'his': case 'hers':
			newIt = { Martian: 'ɥaƙ', IPA: '/hʷac/', English: 'its' };
			break;
		case 'to him': case 'to her':
			newIt = { Martian: 'ɥöȝ', IPA: '/hʷoːj/', English: 'to it' };
			break;
		// default: return word;
	}
	return { ...newIt, POS: 'pronoun' };
}

export function personCheck(word: string): GetAffix {
	let getWord: { word: string };
	switch (true) {
		case /er$/.test(word):
			getWord = { word: word.slice(0, -2) }; break;
		case word === 'baker':
			getWord = { word: 'bake' }; break;
		case word === 'psychologist':
			getWord = { word: 'psychology' }; break;
		default: return returnObject(word);
	}
	return getWordAffix({ ...getWord, prefix: 'ꝭE', IPA: '/ʃe/', English: word });
}
