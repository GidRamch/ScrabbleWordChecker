import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinderPage } from './finder.page';

describe('FinderPage', () => {
  let component: FinderPage;
  let fixture: ComponentFixture<FinderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
