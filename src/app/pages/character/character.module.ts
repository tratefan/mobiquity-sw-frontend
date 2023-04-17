import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterRoutingModule } from './character-routing.module';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { StoreModule } from '@ngrx/store';
import { CHARACTERS_STATE_KEY } from 'src/app/shared/store/character/character.state';
import { CharactersReducer } from 'src/app/shared/store/character/character.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CharacterEffects } from 'src/app/shared/store/character/character.effects';
import { MovieCardModule } from 'src/app/shared/components/movie-card/movie-card.module';

@NgModule({
  declarations: [CharacterDetailComponent],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    MovieCardModule,
    // EffectsModule.forFeature([CharacterEffects]),
    // StoreModule.forFeature(CHARACTERS_STATE_KEY, CharactersReducer),
  ],
})
export class CharacterModule {}
