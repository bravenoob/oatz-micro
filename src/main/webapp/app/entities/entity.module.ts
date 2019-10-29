import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'enterprise',
        loadChildren: () => import('./oatzSkill/enterprise/enterprise.module').then(m => m.OatzSkillEnterpriseModule)
      },
      {
        path: 'project',
        loadChildren: () => import('./oatzSkill/project/project.module').then(m => m.OatzSkillProjectModule)
      },
      {
        path: 'skill',
        loadChildren: () => import('./oatzSkill/skill/skill.module').then(m => m.OatzSkillSkillModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class OatzEntityModule {}
