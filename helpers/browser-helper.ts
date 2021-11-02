class BrowserHelper {
  /**
   *
   * @param element The element you're waiting to be displayed
   * @param timeout How long to wait for (in seconds) (optional) (default is 5secs)
   */
  async waitForElementToBeDisplayed(element: WebdriverIO.Element, timeout?: number) {
    let counter = 0;
    while (counter < (timeout ?? 5) * 2) {
      if (await element.isDisplayed()) {
        return;
      }
      await browser.pause(500);
    }
  }

  /**
   *
   * @param element The element you're waiting to not be displayed
   * @param timeout How long to wait for (in seconds) (optional) (default is 5secs)
   */
  async waitForElementToBeGone(element: WebdriverIO.Element, timeout?: number) {
    let counter = 0;
    while (counter < (timeout ?? 5) * 2) {
      if (!(await element.isDisplayed())) {
        return;
      }
      await browser.pause(500);
    }
  }

  /**
   * Performs a mouse click given a set of coordinates.
   * @param x The X coordinate
   * @param y The Y coordinate
   */
  async performClick(x: number, y: number): Promise<void> {
    await browser.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'mouse' },
        actions: [
          { type: 'pointerMove', duration: 0, x, y },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);
  }
}

export default new BrowserHelper();
