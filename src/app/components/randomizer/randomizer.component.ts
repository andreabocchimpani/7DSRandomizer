import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/services/character.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ThemeService } from 'src/services/theme.service';


@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {

  isHandset: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.HandsetPortrait)
  .pipe(
    map(result => result.matches)
  );

  darkTheme =  new FormControl(false);

  public characters: any;
  public isCharacterSelected: any
  public squad: any;
  public filteredCharacters: any[];
  public filters: any;
  public isCompact: boolean;
  public isLight: boolean;


  constructor(private characterservice: CharacterService, private breakpointObserver: BreakpointObserver, private themeService: ThemeService) { 
    this.filteredCharacters = [];
    this.filters = {};
    this.isCompact = false;
    this.isLight = false;

    // if (localStorage.getItem('extendedVersion') === 'false') {
    //   console.log('sono qua vero')
    //   this.isCompact = true;
    // } else {
    //   console.log('sono qua falso')
    //   this.isCompact = false;
    // }

    console.log('local', localStorage)
  }

  ngOnInit(): void {
    this.initCharacterList();
  }

  initCharacterList(){
    this.characterservice.getCharacter().subscribe(c => {
      this.characters = c;
      this.filteredCharacters = c;
    })
  }

  changeTheme(){
    this.isLight = !this.isLight
  }

  changeView(){
    if (localStorage.getItem('extendedVersion') === 'false') {
      localStorage.setItem('extendedVersion', 'true');
      console.log('local nel change - true', localStorage)
    } else {
      localStorage.setItem('extendedVersion', 'false'); 
      console.log('local nel change - false', localStorage)   
    }
    this.isCompact = !this.isCompact;
  }

  randomCharacter() {
    var selectedCharacter = this.filteredCharacters[Math.floor(Math.random() * this.filteredCharacters.length)];
    console.log('selected', selectedCharacter);
    this.isCharacterSelected = selectedCharacter;
  }
  
  getMoreRandom(arr, n) {
    const tempArray = [...arr];
    this.squad = [];
    while(this.squad.length !==n) {
      const index = Math.floor(Math.random() * tempArray.length);
      const selectedCharacter = tempArray[index];
      if (this.squad.filter(c => c.name.includes(selectedCharacter.name[0])).length === 0) {
        this.squad.push(tempArray[index]);
        tempArray.splice(index, 1);        
      }
    }
  }

  filterBy(value: any, type: string){
    if (!this.filters[type]) {
      this.filters[type] = [];
    }
    if (this.filters[type].includes(value)){
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    } else {
      this.filters[type].push(value)
    }
    console.log('filter', this.filters[type])
    this.filterCharacters();
  }

  filterCharacters(){
    this.filteredCharacters = this.characters;
    for (const key in this.filters) {
      if (Object.prototype.hasOwnProperty.call(this.filters, key)) {
        const filters = this.filters[key];
        if (filters.length > 0) {
          this.filteredCharacters = this.filteredCharacters.filter(c => filters.some(f => c[key] === f));
        }
      }
    }
  }

}
