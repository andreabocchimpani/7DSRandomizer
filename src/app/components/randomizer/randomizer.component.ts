import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/services/character.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';


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

  public characters: any;
  public isCharacterSelected: any
  public squad: any;
  public filteredCharacters: any[];
  public filters: any;
  public isCompact: boolean;
  public isLight: boolean;
  public isFilterClosed: boolean;


  constructor(private characterservice: CharacterService, private breakpointObserver: BreakpointObserver) {
    this.filteredCharacters = [];
    this.filters = {};
    this.isCompact = localStorage.getItem('isCompact') === 'true' ? true : false;
    this.isLight = localStorage.getItem('isLight') === 'true' ? true : false;
    this.isFilterClosed = false;
  }

  ngOnInit(): void {
    this.initCharacterList();
  }

  initCharacterList() {
    this.characterservice.getCharacter().subscribe(c => {
      this.characters = c;
      this.filteredCharacters = c;
    })
  }

  openCloseFilter(){
    this.isFilterClosed = !this.isFilterClosed;
  }

  changeTheme() {
    this.isLight = !this.isLight;
    localStorage.setItem('isLight', this.isLight + '');
  }

  changeView() {
    this.isCompact = !this.isCompact;
    localStorage.setItem('isCompact', this.isCompact + '');
  }

  changeCharacter(character: any) {
    var selectedCharacter = this.filteredCharacters[Math.floor(Math.random() * this.filteredCharacters.length)]
    this.squad.splice(this.squad.indexOf(character), 1, selectedCharacter);
  }

  randomCharacter() {
    var selectedCharacter = this.filteredCharacters[Math.floor(Math.random() * this.filteredCharacters.length)];
    this.isCharacterSelected = selectedCharacter;
  }

  getMoreRandom(arr, n) {
    const tempArray = [...arr];
    this.squad = [];
    while (this.squad.length !== n) {
      const index = Math.floor(Math.random() * tempArray.length);
      const selectedCharacter = tempArray[index];
      if (this.squad.filter(c => c.name.includes(selectedCharacter.name[0])).length === 0) {
        this.squad.push(tempArray[index]);
        tempArray.splice(index, 1);
      }
    }
  }

  filterBy(value: any, type: string) {
    if (!this.filters[type]) {
      this.filters[type] = [];
    }
    if (this.filters[type].includes(value)) {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    } else {
      this.filters[type].push(value)
    }
    this.filterCharacters();
  }

  filterCharacters() {
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
