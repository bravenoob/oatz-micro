// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EnterpriseComponentsPage, EnterpriseDeleteDialog, EnterpriseUpdatePage } from './enterprise.page-object';

const expect = chai.expect;

describe('Enterprise e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let enterpriseComponentsPage: EnterpriseComponentsPage;
  let enterpriseUpdatePage: EnterpriseUpdatePage;
  let enterpriseDeleteDialog: EnterpriseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Enterprises', async () => {
    await navBarPage.goToEntity('enterprise');
    enterpriseComponentsPage = new EnterpriseComponentsPage();
    await browser.wait(ec.visibilityOf(enterpriseComponentsPage.title), 5000);
    expect(await enterpriseComponentsPage.getTitle()).to.eq('oatzApp.oatzSkillEnterprise.home.title');
  });

  it('should load create Enterprise page', async () => {
    await enterpriseComponentsPage.clickOnCreateButton();
    enterpriseUpdatePage = new EnterpriseUpdatePage();
    expect(await enterpriseUpdatePage.getPageTitle()).to.eq('oatzApp.oatzSkillEnterprise.home.createOrEditLabel');
    await enterpriseUpdatePage.cancel();
  });

  it('should create and save Enterprises', async () => {
    const nbButtonsBeforeCreate = await enterpriseComponentsPage.countDeleteButtons();

    await enterpriseComponentsPage.clickOnCreateButton();
    await promise.all([enterpriseUpdatePage.setTitleInput('title')]);
    expect(await enterpriseUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    await enterpriseUpdatePage.save();
    expect(await enterpriseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await enterpriseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Enterprise', async () => {
    const nbButtonsBeforeDelete = await enterpriseComponentsPage.countDeleteButtons();
    await enterpriseComponentsPage.clickOnLastDeleteButton();

    enterpriseDeleteDialog = new EnterpriseDeleteDialog();
    expect(await enterpriseDeleteDialog.getDialogTitle()).to.eq('oatzApp.oatzSkillEnterprise.delete.question');
    await enterpriseDeleteDialog.clickOnConfirmButton();

    expect(await enterpriseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
