import { getTestConfig, ITestConfig } from '../config/ITestConfig';

/**
 * a base page object containing common methods and properties across all page objects.
 */
export default class PageBase {
  config: ITestConfig;
  constructor() {
    this.config = getTestConfig();
  }
}
