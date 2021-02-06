import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/services/character.service';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {

  public characters: any;
  public isCharacterSelected: any
  public squad: any;
  public filteredCharacters: any[];
  public filters: any;

  constructor(private characterservice: CharacterService) { 
    this.filteredCharacters = [];
    this.filters = {};
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

  randomCharacter() {
    var selectedCharacter = this.filteredCharacters[Math.floor(Math.random() * this.filteredCharacters.length)];
    console.log('selected', selectedCharacter);
    this.isCharacterSelected = selectedCharacter;
  }
  
  getMoreRandom(arr, n) {
    this.squad = new Array(n);
    var len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        this.squad[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return this.squad;
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
    console.log('charcathers filtrato', this.filteredCharacters)
  }

}
