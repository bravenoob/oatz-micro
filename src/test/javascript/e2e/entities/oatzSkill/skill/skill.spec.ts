// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SkillComponentsPage, SkillDeleteDialog, SkillUpdatePage } from './skill.page-object';

const expect = chai.expect;

describe('Skill e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let skillComponentsPage: SkillComponentsPage;
  let skillUpdatePage: SkillUpdatePage;
  let skillDeleteDialog: SkillDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Skills', async () => {
    await navBarPage.goToEntity('skill');
    skillComponentsPage = new SkillComponentsPage();
    await browser.wait(ec.visibilityOf(skillComponentsPage.title), 5000);
    expect(await skillComponentsPage.getTitle()).to.eq('oatzApp.oatzSkillSkill.home.title');
  });

  it('should load create Skill page', async () => {
    await skillComponentsPage.clickOnCreateButton();
    skillUpdatePage = new SkillUpdatePage();
    expect(await skillUpdatePage.getPageTitle()).to.eq('oatzApp.oatzSkillSkill.home.createOrEditLabel');
    await skillUpdatePage.cancel();
  });

  it('should create and save Skills', async () => {
    const nbButtonsBeforeCreate = await skillComponentsPage.countDeleteButtons();

    await skillComponentsPage.clickOnCreateButton();
    await promise.all([skillUpdatePage.setSkillNameInput('skillName')]);
    expect(await skillUpdatePage.getSkillNameInput()).to.eq('skillName', 'Expected SkillName value to be equals to skillName');
    await skillUpdatePage.save();
    expect(await skillUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await skillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Skill', async () => {
    const nbButtonsBeforeDelete = await skillComponentsPage.countDeleteButtons();
    await skillComponentsPage.clickOnLastDeleteButton();

    skillDeleteDialog = new SkillDeleteDialog();
    expect(await skillDeleteDialog.getDialogTitle()).to.eq('oatzApp.oatzSkillSkill.delete.question');
    await skillDeleteDialog.clickOnConfirmButton();

    expect(await skillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
