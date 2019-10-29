import { element, by, ElementFinder } from 'protractor';

export class SkillComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-skill div table .btn-danger'));
  title = element.all(by.css('jhi-skill div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class SkillUpdatePage {
  pageTitle = element(by.id('jhi-skill-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  skillNameInput = element(by.id('field_skillName'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSkillNameInput(skillName) {
    await this.skillNameInput.sendKeys(skillName);
  }

  async getSkillNameInput() {
    return await this.skillNameInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class SkillDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-skill-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-skill'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
