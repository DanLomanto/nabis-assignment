export interface ITestConfig {
  app: {
    baseUrl: string;
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Gets the test config after it's been setup via the wdio
// config file before any test was run.
export function getTestConfig(): ITestConfig {
  return browser.config['test'] as ITestConfig;
}
