import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  public characters: any;
  public isCharacterSelected: any;
  public filteredCharacters: any[];
  public filterGrade: any[];
  public filterRace: any[];
  public filterAttribute: any[];
  public filters: any;
  public searchString: string;
  public isCompact: boolean;

  constructor(private characterservice: CharacterService) {
    this.filteredCharacters = [];
    this.filterGrade = [];
    this.filterRace = [];
    this.filterAttribute = [];
    this.filters = {};
    this.searchString = '';
    this.isCompact = false;
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

  filterBy(value: any, type: string){
    if (!this.filters[type]) {
      this.filters[type] = [];
    }
    if (this.filters[type].includes(value)){
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    } else {
      this.filters[type].push(value)
    }
    console.log('filtergrade', this.filters[type])
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
    console.log('charcathers filtrato', this.filteredCharacters)
  }

  changeView(){
    this.isCompact = !this.isCompact;
  }

  // filterByGrade(grade: any){
  //   if (!this.filters.grade) {
  //     this.filters.grade = [];
  //   }
  //   if (this.filters.grade.includes(grade)){
  //     this.filters.grade.splice(this.filters.grade.indexOf(grade), 1);
  //   } else {
  //     this.filters.grade.push(grade)
  //   }
  //   console.log('filtergrade', this.filters.grade)
  //   this.filterCharacters();
  // }

  // filterByRace(race: any){
  //   if (!this.filters.race) {
  //     this.filters.race = [];
  //   }
  //   if (this.filters.race.includes(race)){
  //     this.filters.race.splice(this.filters.race.indexOf(race), 1);
  //   } else {
  //     this.filters.race.push(race)
  //   }
  //   console.log('filterrace', this.filters.race)
  //   this.filterCharacters();
  // }

  // filterByAttribute(attribute: any){
  //   if (!this.filters.attribute) {
  //     this.filters.attribute = [];
  //   }
  //   if (this.filters.attribute.includes(attribute)){
  //     this.filters.attribute.splice(this.filters.attribute.indexOf(attribute), 1);
  //   } else {
  //     this.filters.attribute.push(attribute)
  //   }
  //   console.log('filterattribute', this.filters.attribute);
  //   this.filterCharacters();
  // }

  // filterCharacters1(){
  //   this.filteredCharacters = this.characters;
  //   for (const key in this.filters) {
  //     if (Object.prototype.hasOwnProperty.call(this.filters, key)) {
  //       let filtered = [];
  //       const filters = this.filters[key];
  //       filters.forEach(f => {
  //         filtered = this.characters.filter(c => c[key] === f);
  //         this.filteredCharacters.push(filtered);
  //       })
  //     }
  //   }
  // }


}
