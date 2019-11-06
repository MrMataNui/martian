import { marsDitionary } from '../dictionary.min';

export interface English {
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

export interface Martian {
	Martian: string;
	IPA: string;
	POS: string;
	English: string;
}

export interface Dictionary {
	english: English[];
	martian: Martian[];
}

export const dictionary: Dictionary = marsDitionary;

export interface Romanization {
	romanization: string;
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
