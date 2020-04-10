import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonatePage } from './donate.page';

describe('DonatePage', () => {
  let component: DonatePage;
  let fixture: ComponentFixture<DonatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
