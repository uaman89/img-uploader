import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewBlockComponent } from './image-preview-block.component';

describe('ImagePreviewBlockComponent', () => {
  let component: ImagePreviewBlockComponent;
  let fixture: ComponentFixture<ImagePreviewBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePreviewBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
