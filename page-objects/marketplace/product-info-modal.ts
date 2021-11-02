import browserHelper from '../../helpers/browser-helper';
import PageBase from '../page-base';

export default class ProductInfoModal extends PageBase {
  private modalContainerXpath = `//div[contains(@class, "ui scrolling modal transition visible active")]`;

  private get modalContainer() {
    return $(this.modalContainerXpath);
  }

  private get productImageUrl() {
    return $(
      `${this.modalContainerXpath}//div[@tabIndex="-1" and @style="width: 100%; display: inline-block;"]`
    );
  }

  private get productDescription() {
    return $(`${this.modalContainerXpath}//div[text()="Unit Description"]/..`);
  }

  /**
   * Gets the information of the product that was selected.
   */
  async getProductInfo(): Promise<{ imageUrl: string; description: string }> {
    browserHelper.waitForElementToBeDisplayed(await this.modalContainer);
    const imageUrl = (await this.productImageUrl.getCSSProperty('background')).value;
    const description = await this.productDescription.getText();
    return { imageUrl, description: description.replace('Unit Description\n', '') };
  }

  async isModalDisplayed(waitForModal?: boolean): Promise<boolean> {
    if (waitForModal) {
      await browserHelper.waitForElementToBeDisplayed(await this.modalContainer);
    }
    const modal = await this.modalContainer;
    const displayed = await modal.isDisplayed();
    return displayed;
  }
}
