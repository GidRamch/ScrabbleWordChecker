import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DbInitPage } from './db-init.page';

describe('DbInitPage', () => {
  let component: DbInitPage;
  let fixture: ComponentFixture<DbInitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbInitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DbInitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
