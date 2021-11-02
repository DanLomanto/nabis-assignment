import browserHelper from '../../helpers/browser-helper';
import PageBase from '../page-base';

export default class SignupForm extends PageBase {
  private get locationInput() {
    return $('//div[@name="licensedLocationId"]//input');
  }

  private get locationErrorMsg() {
    return $('//label[@for="licensedLocationId"]//div[@color="red"]');
  }

  private get driversLicenseLast7Input() {
    return $('#locationValidation');
  }

  private get driversLicenseErrorMsg() {
    return $('//label[@for="locationValidation"]//div[@color="red"]');
  }

  private get workEmailInput() {
    return $('#email');
  }

  private get workEmailErrorMsg() {
    return $('//label[@for="email"]//div[@color="red"]');
  }

  private get submitBtn() {
    return $('//button[text()="Submit"]');
  }

  /**
   * Sets the Location input field.
   * @param location The location to set the input to
   */
  async setLocation(location: string): Promise<void> {
    const input = await this.locationInput;
    await input.setValue(location);
    const clickableAddress = await $(`//div[@role="listbox"]//span[text()="${location}"]`);
    await browserHelper.waitForElementToBeDisplayed(clickableAddress);
    await clickableAddress.click();
  }

  /**
   * Gets the error message displayed for the location input
   * @returns the error message
   */
  async getLocationErrorMsg(): Promise<string> {
    const errorMsg = await this.locationErrorMsg;
    if (!(await errorMsg.isDisplayed())) {
      return null;
    }
    return await errorMsg.getText();
  }

  /**
   * Sets the last 7 of driver's license input field.
   * @param number The number to set the input to.
   */
  async setDriversLicenseNum(number: string): Promise<void> {
    const input = await this.driversLicenseLast7Input;
    await input.setValue(number);
  }

  /**
   * Gets the error message displayed for the license number input
   * @returns the error message
   */
  async getDriversLicenseNumErrorMsg(): Promise<string> {
    const errorMsg = await this.driversLicenseErrorMsg;
    if (!(await errorMsg.isDisplayed())) {
      return null;
    }
    return await errorMsg.getText();
  }

  /**
   * Sets the work email input field.
   * @param email The email to set the input to
   */
  async setWorkEmail(email: string): Promise<void> {
    const input = await this.workEmailInput;
    await input.setValue(email);
  }

  /**
   * Gets the error message displayed for the work email input
   * @returns the error message
   */
  async getWorkEmailErrorMsg(): Promise<string> {
    const errorMsg = await this.workEmailErrorMsg;
    if (!(await errorMsg.isDisplayed())) {
      return null;
    }
    return await errorMsg.getText();
  }

  /**
   * Clicks the Submit button.
   */
  async clickSubmit(): Promise<void> {
    const input = await this.submitBtn;
    await input.click();
  }
}
