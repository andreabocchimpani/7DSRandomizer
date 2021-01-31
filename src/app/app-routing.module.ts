import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { HomeComponent } from './components/home/home.component';
import { RandomizerComponent } from './components/randomizer/randomizer.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'randomizer', component: RandomizerComponent },
  { path: 'character-list', component: CharacterListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }