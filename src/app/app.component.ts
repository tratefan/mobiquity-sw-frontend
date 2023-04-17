import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from './shared/store/app.state';
import { getLoading } from './shared/store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MobiquitySwFrontend';
  private _destroy$: Subject<void> = new Subject<void>();
  constructor(
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initLoadingStream();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initLoadingStream(): void {
    this.store
      .select(getLoading)
      .pipe(takeUntil(this._destroy$))
      .subscribe((show) => {
        if (show) this.spinner.show();
        else this.spinner.hide();
      });
  }
}
