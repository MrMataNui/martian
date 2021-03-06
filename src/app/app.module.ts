import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { GrammarComponent } from './grammar/grammar.component';
import { PhonologyComponent } from './phonology/phonology.component';
import { DataComponent } from './data/data.component';
import { TranslateComponent } from './translate/translate.component';

const appRoutes: Routes = [
	{ path: 'translator', component: TranslateComponent },
	{ path: 'phonology', component: PhonologyComponent },
	{ path: 'grammar', component: GrammarComponent },
	{ path: 'dictionary', component: DictionaryComponent },
	{ path: 'data', component: DataComponent },
	{ path: '', redirectTo: '/translator', pathMatch: 'full' },
	{ path: '**', redirectTo: '/translator', pathMatch: 'full' }
];

@NgModule({
		imports: [
			BrowserModule,
			AppRoutingModule,
			RouterModule.forRoot(appRoutes)
		],
		declarations: [
			AppComponent,
			DictionaryComponent,
			GrammarComponent,
			PhonologyComponent,
			DataComponent,
			TranslateComponent
		],
		providers: [],
		bootstrap: [
			AppComponent
		]
})
export class AppModule { }
