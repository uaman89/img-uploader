import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BlockViewComponent} from './block-view.component';
import {ImagePreviewBlockComponent} from '../image-preview-block/image-preview-block.component';
import {ImageStoreService} from '../../services/image-store.service';
import {UsersService} from '../../services/users.service';
import {HttpClientModule} from '@angular/common/http';

describe('BlockViewComponent', () => {
  let component: BlockViewComponent;
  let fixture: ComponentFixture<BlockViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        ImageStoreService,
      ],
      declarations: [
        BlockViewComponent,
        ImagePreviewBlockComponent
      ],
      imports: [
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
