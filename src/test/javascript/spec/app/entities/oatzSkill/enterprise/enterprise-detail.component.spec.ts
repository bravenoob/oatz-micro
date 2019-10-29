import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OatzTestModule } from '../../../../test.module';
import { EnterpriseDetailComponent } from 'app/entities/oatzSkill/enterprise/enterprise-detail.component';
import { Enterprise } from 'app/shared/model/oatzSkill/enterprise.model';

describe('Component Tests', () => {
  describe('Enterprise Management Detail Component', () => {
    let comp: EnterpriseDetailComponent;
    let fixture: ComponentFixture<EnterpriseDetailComponent>;
    const route = ({ data: of({ enterprise: new Enterprise(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OatzTestModule],
        declarations: [EnterpriseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EnterpriseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EnterpriseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.enterprise).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
