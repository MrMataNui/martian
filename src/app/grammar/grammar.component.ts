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
    Subject: this.subscript('Mary', 'Sub'),
    Oblique: this.subscript('with a key', 'Obl'),
    Object: this.subscript('the door', 'Obj'),
    Verb: this.subscript('opened', 'Verb'),
  })
  word = (): Words => ({
    order: this.getBrackets('Object-Subject-Verb-Oblique'),
    adOrder: this.getBrackets('Adjectives are positioned after the noun'),
    adposition: this.getBrackets('Postpositions'),
  })

  getWordOrder(lang: string): string {
    const { Subject, Verb, Object, Oblique } = this.partOfSpeech();
    switch (lang) {
      case 'English': return this.getBrackets(Subject + Verb + Object + Oblique);
      case 'Martian': return this.getBrackets(Object + Subject  + Verb + Oblique);
    }
  }

  ngOnInit() { }
}
