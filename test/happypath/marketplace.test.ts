import browserHelper from '../../helpers/browser-helper';
import AgeRestictionModal from '../../page-objects/marketplace/age-restriction-modal';
import MarketplacePage, {
  MarketplaceCategory,
  ScrollDirection,
} from '../../page-objects/marketplace/marketplace-page';
import ProductInfoModal from '../../page-objects/marketplace/product-info-modal';

describe('Marketplace Page', () => {
  beforeEach(async () => {
    const marketplacePage = new MarketplacePage();
    await marketplacePage.open();

    const ageRestictionModal = new AgeRestictionModal();
    await ageRestictionModal.waitForModalToDisplay();
    await ageRestictionModal.clickEnterBtn();
    await ageRestictionModal.waitForModalToGoAway();
  });

  it('should check if products are loaded in marketplace', async () => {
    const marketplacePage = new MarketplacePage();
    expect(await marketplacePage.getNumberOfDisplayedProducts()).toEqual(30); // 3 per category
  });

  it('are products displayed in marketplace', async () => {
    const marketplacePage = new MarketplacePage();
    await marketplacePage.scrollToProducts();
    expect(await marketplacePage.areProductsVisible()).toEqual(true);
  });

  it("should view a product's details", async () => {
    const marketplacePage = new MarketplacePage();
    await marketplacePage.scrollToProducts();
    marketplacePage.clickFirstProduct();

    const productInfoModal = new ProductInfoModal();
    const info = await productInfoModal.getProductInfo();

    expect(info.description.length).toBeGreaterThan(0);
    expect(info.imageUrl).toContain('https://nabis.imgix.net/');
  });

  it('clicking outside product info modal should close', async () => {
    const marketplacePage = new MarketplacePage();
    await marketplacePage.scrollToProducts();
    marketplacePage.clickFirstProduct();

    const productInfoModal = new ProductInfoModal();
    let displayed = await productInfoModal.isModalDisplayed(true);
    expect(displayed).toEqual(true);

    // Click outside modal
    await browserHelper.performClick(5, 5);

    displayed = await productInfoModal.isModalDisplayed();
    expect(displayed).toEqual(false);
  });

  it('should scroll through category and change products', async () => {
    const marketplacePage = new MarketplacePage();
    const existingProducts = await marketplacePage.getProductsInCategory(
      MarketplaceCategory.NewestDrops
    );

    await marketplacePage.scrollCategory(MarketplaceCategory.NewestDrops, ScrollDirection.Right);

    const newProducts = await marketplacePage.getProductsInCategory(
      MarketplaceCategory.NewestDrops
    );

    expect(existingProducts.some((x) => newProducts.includes(x))).toEqual(false);
  });
});
