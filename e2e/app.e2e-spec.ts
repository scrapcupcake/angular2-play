import { Angular2PlayPage } from './app.po';

describe('angular2-play App', function() {
  let page: Angular2PlayPage;

  beforeEach(() => {
    page = new Angular2PlayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
