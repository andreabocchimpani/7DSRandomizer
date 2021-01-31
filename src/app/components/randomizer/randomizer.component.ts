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

  constructor(private characterservice: CharacterService) { }

  ngOnInit(): void {
    this.characterservice.getCharacter().subscribe(c => {
      this.characters = c;
    })
  }

  randomCharacter() {
    var selectedCharacter = this.characters[Math.floor(Math.random() * this.characters.length)];
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
}
