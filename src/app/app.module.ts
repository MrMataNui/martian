import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { GrammarComponent } from './grammar/grammar.component';
import { PhonologyComponent } from './phonology/phonology.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'phonology', component: PhonologyComponent },
  { path: 'grammar', component: GrammarComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: '', redirectTo: '/phonology', pathMatch: 'full' },
  { path: '**', redirectTo: '/phonology', pathMatch: 'full' }
];

@NgModule({
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes)],
  declarations: [
    AppComponent,
    DictionaryComponent,
    GrammarComponent,
    PhonologyComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
