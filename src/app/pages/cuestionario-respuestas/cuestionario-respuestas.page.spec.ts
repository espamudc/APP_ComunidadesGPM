import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuestionarioRespuestasPage } from './cuestionario-respuestas.page';

describe('CuestionarioRespuestasPage', () => {
  let component: CuestionarioRespuestasPage;
  let fixture: ComponentFixture<CuestionarioRespuestasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioRespuestasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuestionarioRespuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
