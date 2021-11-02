import PageBase from '../page-base';

export default class MarketplacePage extends PageBase {
  private productContainerSelector: string =
    '//div[@class="slick-track"]//div[contains(@class, "slick-slide slick-active")]';

  private viewProductBtnSelector = `//button[text()="View Product"][1]`;

  private get allProductContainers() {
    return $$(this.productContainerSelector);
  }

  private getCategorySectionXpath(category: MarketplaceCategory) {
    return `//h1[text()="${category}"]/../../../following-sibling::section[1]`;
  }

  /**
   * Opens the marketplace of the app.
   */
  async open() {
    await browser.navigateTo(this.config.app.baseUrl);
  }

  /**
   * Scrolls down to the category/products section of the page.
   */
  async scrollToProducts(): Promise<void> {
    const allProducts = await this.allProductContainers;
    await allProducts[0].scrollIntoView();
  }

  /**
   * Returns whether products have loaded on the page or not.
   */
  async areProductsVisible(): Promise<boolean> {
    const allProducts = await this.allProductContainers;
    for (let i = 0; i < allProducts.length; i++) {
      if (await allProducts[i].isDisplayed()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the number of products currently being displayed on the page.
   */
  async getNumberOfDisplayedProducts(): Promise<number> {
    const allProducts = await this.allProductContainers;
    return allProducts.length;
  }

  /**
   * Clicks on the 'View Product' button for the first product on the page.
   */
  async clickFirstProduct(): Promise<void> {
    const allProducts = await this.allProductContainers;
    const viewProductBtn = await allProducts[0].$(this.viewProductBtnSelector);
    await viewProductBtn.click();
  }

  /**
   * Scrolls the list of products within a category.
   * @param category The category to scroll in.
   * @param direction The direction to scroll.
   */
  async scrollCategory(category: MarketplaceCategory, direction: ScrollDirection): Promise<void> {
    const scrollBtn = await $(
      this.getCategorySectionXpath(category) + `//i[@class="angle ${direction} icon"]`
    );
    await scrollBtn.click();
  }

  /**
   * Gets all of the visible products under a category on the page.
   * @param category The category to get the products for.
   * @returns The name and brand of each product currently visible under a category.
   */
  async getProductsInCategory(
    category: MarketplaceCategory
  ): Promise<{ name: string; brand: string }[]> {
    const products = await $$(
      this.getCategorySectionXpath(category) + '//div[contains(@class, "slick-slide slick-active")]'
    );

    const activeProducts = [];
    for (const product of products) {
      const name = await product.$('h1').getText();
      const brand = await product.$('h2').getText();
      activeProducts.push({ name, brand });
    }

    return activeProducts;
  }
}

export enum MarketplaceCategory {
  NewestDrops = 'Newest Drops',
  RecommendedForYou = 'Recommended For You',
  PopularNearYou = 'Popular Near You',
  MostAffordable = 'Most Affordable',
  NabisPotluck = 'Nabis Potluck',
  Edibles = 'Edibles',
  Flower = 'Flower',
  PreRolls = 'Pre-Rolls',
  BasedOnYourPurchases = 'Based On Your Purchases',
}

export enum ScrollDirection {
  Left = 'left',
  Right = 'right',
}
