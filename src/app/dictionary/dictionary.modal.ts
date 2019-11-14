import { marsDitionary, soundSymbol } from '../dictionary.min';

export interface Dictionary {
	English: string;
	POS: string;
	Martian: string;
}

export const dictionary: Dictionary[] = marsDitionary;

export interface Romanization {
	Romanization: string;
	IPA: string;
	English: string;
	POS: string;
	Martian: string;
	POS2?: string;
	Martian2?: string;
	POS3?: string;
	Martian3?: string;
	POS4?: string;
	Martian4?: string;
}

export interface SoundSymbols {
	sound: string;
	letter: string;
	Romanization: string;
}

export interface Lexicon {
	spelling: string;
	IPA: string;
	POS: string;
	English: string;
	POS2: string;
	English2: string;
	POS3: string;
	English3: string;
	POS4: string;
	English4: string;
}

export interface FirstWord {
	letter: string;
	word: string;
}

export interface GerSymbols { letter: string; romanization: string; }

export const soundSymbols: SoundSymbols[] = soundSymbol;
