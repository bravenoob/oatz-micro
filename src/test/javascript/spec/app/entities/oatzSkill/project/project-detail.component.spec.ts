import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OatzTestModule } from '../../../../test.module';
import { ProjectDetailComponent } from 'app/entities/oatzSkill/project/project-detail.component';
import { Project } from 'app/shared/model/oatzSkill/project.model';

describe('Component Tests', () => {
  describe('Project Management Detail Component', () => {
    let comp: ProjectDetailComponent;
    let fixture: ComponentFixture<ProjectDetailComponent>;
    const route = ({ data: of({ project: new Project(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OatzTestModule],
        declarations: [ProjectDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProjectDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProjectDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.project).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
