import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        NgxSpinnerModule,
        FontAwesomeModule
      ],
      declarations: [
        AppComponent,
        LayoutComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        provideMockStore({}),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });

  beforeEach(() => {
  })

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MobiquitySwFrontend'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('MobiquitySwFrontend');
  });

  it('should render H2 title saying SWAPI Movies', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header h2')?.textContent).toContain('SWAPI Movies');
  });

});
