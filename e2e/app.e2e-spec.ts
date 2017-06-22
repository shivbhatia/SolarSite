import { SolarsitePage } from './app.po';

describe('solarsite App', () => {
  let page: SolarsitePage;

  beforeEach(() => {
    page = new SolarsitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
