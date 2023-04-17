import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICharacter } from 'src/app/shared/interfaces';
import { AppState } from 'src/app/shared/store/app.state';
import { getCharacterById } from 'src/app/shared/store/character/character.selector';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent implements OnChanges {
  @Input() characterId: string = '';

  public character$!: Observable<ICharacter>;

  constructor(private store: Store<AppState>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['characterId']) {
      this.character$ = this.store.select(getCharacterById(this.characterId));
    }
  }
}
