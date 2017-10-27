import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableViewComponent} from './table-view.component';
import {ImageStoreService} from '../../services/image-store.service';
import {UsersService} from '../../services/users.service';
import {HttpClientModule} from '@angular/common/http';

describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        ImageStoreService,
      ],
      imports: [
        HttpClientModule
      ],
      declarations: [
        TableViewComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
