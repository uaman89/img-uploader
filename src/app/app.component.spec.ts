import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {APP_BASE_HREF} from '@angular/common';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
        AppModule
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Img:Uploader'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Img:Uploader');
  }));

  it('should have <header>,<footer> and <router-outlet>', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('header, footer, router-outlet').length).toEqual(3);
  }));
});
