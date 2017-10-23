import { ImgUploderPage } from './app.po';

describe('img-uploder App', () => {
  let page: ImgUploderPage;

  beforeEach(() => {
    page = new ImgUploderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
