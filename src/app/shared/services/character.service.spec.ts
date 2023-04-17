import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CharacterService } from './character.service';
import { Store, StoreModule } from '@ngrx/store';
import {
  provideMockStore
} from '@ngrx/store/testing';

describe('CharacterService', () => {
  let service: CharacterService;
  const initialState = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    });
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
