import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuestionariosAsignadosPage } from './cuestionarios-asignados.page';

describe('CuestionariosAsignadosPage', () => {
  let component: CuestionariosAsignadosPage;
  let fixture: ComponentFixture<CuestionariosAsignadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionariosAsignadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuestionariosAsignadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
