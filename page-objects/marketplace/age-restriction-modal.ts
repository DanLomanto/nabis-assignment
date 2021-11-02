import browserHelper from '../../helpers/browser-helper';
import PageBase from '../page-base';

export default class AgeRestictionModal extends PageBase {
  private get ageRestictionModal() {
    return $('//div[text()="Age Restriction"]');
  }

  private get exitBtn() {
    return $('//button[text()="Exit"]');
  }

  private get enterBtn() {
    return $('//button[text()="Enter"]');
  }

  /**
   * Waits for the Age Restriction modal to appear (up to 10 secs).
   */
  async waitForModalToDisplay(): Promise<void> {
    await browserHelper.waitForElementToBeDisplayed(await this.ageRestictionModal, 10);
  }

  /**
   * Waits for the Age Restriction modal to go away (up to 5 secs).
   */
  async waitForModalToGoAway(): Promise<void> {
    await browserHelper.waitForElementToBeGone(await this.ageRestictionModal);
  }

  /**
   * Checks to see if the Age Restricion modal is displayed
   * @returns true or false
   */
  async isModalDisplayed(): Promise<boolean> {
    const displayed = await this.ageRestictionModal.isDisplayed();
    return displayed;
  }

  /**
   * Clicks the 'Exit' button on the Age Restrcition modal
   */
  async clickExitBtn(): Promise<void> {
    await this.exitBtn.click();
  }

  /**
   * Clicks the 'Enter' button on the Age Restrcition modal
   */
  async clickEnterBtn(): Promise<void> {
    await this.enterBtn.click();
  }
}
