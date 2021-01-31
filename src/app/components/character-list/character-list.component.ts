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
  public filteredCharacters: [];

  constructor(private characterservice: CharacterService) { }

  ngOnInit(): void {
    this.characterservice.getCharacter().subscribe(c => {
      this.characters = c;
    })
  }

  filterByGrade(characters: any, grade: any){
    characters.forEach(c => {
      if (c.grade===grade) {
        // this.filteredCharacters.push(c);
      }
      console.log('this.fil', this.filteredCharacters)
    });
    
  }

}
