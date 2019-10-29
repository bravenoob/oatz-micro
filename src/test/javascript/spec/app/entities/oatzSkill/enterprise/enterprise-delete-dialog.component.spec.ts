import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OatzTestModule } from '../../../../test.module';
import { EnterpriseDeleteDialogComponent } from 'app/entities/oatzSkill/enterprise/enterprise-delete-dialog.component';
import { EnterpriseService } from 'app/entities/oatzSkill/enterprise/enterprise.service';

describe('Component Tests', () => {
  describe('Enterprise Management Delete Component', () => {
    let comp: EnterpriseDeleteDialogComponent;
    let fixture: ComponentFixture<EnterpriseDeleteDialogComponent>;
    let service: EnterpriseService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OatzTestModule],
        declarations: [EnterpriseDeleteDialogComponent]
      })
        .overrideTemplate(EnterpriseDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EnterpriseDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EnterpriseService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
