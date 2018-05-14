import { MangaReaderCrawler } from "../src/crawlers";

let crawler = new MangaReaderCrawler();
let mangas = [];
jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe("The MangaReader crawler should work", () => {
  beforeEach = () => {
    crawler = new MangaReaderCrawler();
  };

  test("It should get the list of mangas", async () => {
    mangas = await crawler.getMangaList();
    expect(mangas.length).toBeGreaterThan(0);
  });

  test("It should be able to search manga", async () => {
    const searchedMangas = crawler.searchManga(mangas, "One Piece");
    expect(searchedMangas.length).toBeGreaterThan(0);
  });

  test("It should get the manga info", async () => {
    const searchedMangas = crawler.searchManga(mangas, "One Piece");
    const manga = await crawler.getMangaInfo(
      searchedMangas[0].location
    );
    expect(manga.authors).toContain("Oda, Eiichiro");
  });

  test("It should get the chapters list", async () => {
    const chapters = await crawler.getChapters(mangas[0].location);

    expect(chapters.length).toBeGreaterThan(0);
  });

  test("It should get the pages list", async () => {
    const chapters = await crawler.getChapters(mangas[0].location);
    const pages = await crawler.getPages(chapters[0].location);

    expect(pages.length).toBeGreaterThan(0);
  });
});