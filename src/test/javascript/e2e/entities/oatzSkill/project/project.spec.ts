// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  ProjectComponentsPage,
  /* ProjectDeleteDialog,
   */ ProjectUpdatePage
} from './project.page-object';

const expect = chai.expect;

describe('Project e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let projectComponentsPage: ProjectComponentsPage;
  let projectUpdatePage: ProjectUpdatePage;
  /* let projectDeleteDialog: ProjectDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Projects', async () => {
    await navBarPage.goToEntity('project');
    projectComponentsPage = new ProjectComponentsPage();
    await browser.wait(ec.visibilityOf(projectComponentsPage.title), 5000);
    expect(await projectComponentsPage.getTitle()).to.eq('oatzApp.oatzSkillProject.home.title');
  });

  it('should load create Project page', async () => {
    await projectComponentsPage.clickOnCreateButton();
    projectUpdatePage = new ProjectUpdatePage();
    expect(await projectUpdatePage.getPageTitle()).to.eq('oatzApp.oatzSkillProject.home.createOrEditLabel');
    await projectUpdatePage.cancel();
  });

  /*  it('should create and save Projects', async () => {
        const nbButtonsBeforeCreate = await projectComponentsPage.countDeleteButtons();

        await projectComponentsPage.clickOnCreateButton();
        await promise.all([
            projectUpdatePage.setTitleInput('title'),
            projectUpdatePage.setDescriptionInput('description'),
            projectUpdatePage.typeSelectLastOption(),
            projectUpdatePage.setUserIdInput('5'),
            projectUpdatePage.enterpriseSelectLastOption(),
        ]);
        expect(await projectUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
        expect(await projectUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        expect(await projectUpdatePage.getUserIdInput()).to.eq('5', 'Expected userId value to be equals to 5');
        await projectUpdatePage.save();
        expect(await projectUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await projectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Project', async () => {
        const nbButtonsBeforeDelete = await projectComponentsPage.countDeleteButtons();
        await projectComponentsPage.clickOnLastDeleteButton();

        projectDeleteDialog = new ProjectDeleteDialog();
        expect(await projectDeleteDialog.getDialogTitle())
            .to.eq('oatzApp.oatzSkillProject.delete.question');
        await projectDeleteDialog.clickOnConfirmButton();

        expect(await projectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
