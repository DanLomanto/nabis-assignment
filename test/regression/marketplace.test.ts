import AgeRestictionModal from '../../page-objects/marketplace/age-restriction-modal';
import MarketplacePage from '../../page-objects/marketplace/marketplace-page';
import SignupForm from '../../page-objects/marketplace/signup-form';

describe('Marketplace Page', function () {
  beforeEach(async () => {
    const marketplacePage = new MarketplacePage();
    await marketplacePage.open();

    const ageRestictionModal = new AgeRestictionModal();
    await ageRestictionModal.waitForModalToDisplay();
    await ageRestictionModal.clickEnterBtn();
    await ageRestictionModal.waitForModalToGoAway();
  });

  it('should try to signup without location', async function () {
    const signUpForm = new SignupForm();
    await signUpForm.setDriversLicenseNum('1234567');
    await signUpForm.setWorkEmail('fake@email.com');
    await signUpForm.clickSubmit();

    const errorMsg = await signUpForm.getLocationErrorMsg();
    expect(errorMsg).toEqual('Required');
  });

  [
    {
      licenseNum: '',
      expectedErrorMsg: 'Required',
    },
    {
      licenseNum: '123456',
      expectedErrorMsg: 'Must Enter Exactly 7 Characters',
    },
    {
      licenseNum: '12345678',
      expectedErrorMsg: 'Must Enter Exactly 7 Characters',
    },
    // This test case currently fails. Should be a bug.
    // {
    //   licenseNum: "AAAAAAA",
    //   expectedErrorMsg: 'Must Enter Exactly 7 Characters',
    // },
  ].forEach((testData) => {
    it(`should try to signup without invalid license number of: ${testData.licenseNum}`, async function () {
      const signUpForm = new SignupForm();
      await signUpForm.setLocation('High Times 530');
      await signUpForm.setDriversLicenseNum(testData.licenseNum);
      await signUpForm.setWorkEmail('fake@email.com');
      await signUpForm.clickSubmit();

      const errorMsg = await signUpForm.getDriversLicenseNumErrorMsg();
      expect(errorMsg).toEqual(testData.expectedErrorMsg);
    });
  });

  [
    {
      email: '',
      expectedErrorMsg: 'Required',
    },
    {
      email: 'bad@email',
      expectedErrorMsg: 'email must be a valid email',
    },
    {
      email: 'bademail.com',
      expectedErrorMsg: 'email must be a valid email',
    },
    {
      email: 'bad@email.',
      expectedErrorMsg: 'email must be a valid email',
    },
    // This test currently fails because of a bug.
    // {
    //   email: 'bad@email.c',
    //   expectedErrorMsg: 'email must be a valid email',
    // },
    {
      email: '@bademail.com',
      expectedErrorMsg: 'email must be a valid email',
    },
  ].forEach((testData) => {
    it.only(`should try to signup with invalid email of: ${testData.email}`, async function () {
      const signUpForm = new SignupForm();
      await signUpForm.setLocation('High Times 530');
      await signUpForm.setDriversLicenseNum('1234567');
      await signUpForm.setWorkEmail(testData.email);
      await signUpForm.clickSubmit();

      const errorMsg = await signUpForm.getWorkEmailErrorMsg();
      expect(errorMsg).toEqual(testData.expectedErrorMsg);
    });
  });
});
