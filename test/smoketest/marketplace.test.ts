import AgeRestictionModal from '../../page-objects/marketplace/age-restriction-modal';
import MarketplacePage from '../../page-objects/marketplace/marketplace-page';

describe('Marketplace Page', function () {
  it('is app running', async function () {
    const marketplacePage = new MarketplacePage();
    await marketplacePage.open();

    const ageRestictionModal = new AgeRestictionModal();
    await ageRestictionModal.waitForModalToDisplay();

    expect(await ageRestictionModal.isModalDisplayed()).toEqual(true);
  });
});
