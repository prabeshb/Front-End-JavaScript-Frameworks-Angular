import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Dish } from '../shared/dish';
import { DishService } from '../services/process-httpmsg.service';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseurl';
import { Observable, of } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MenuComponent } from './menu.component';
import { Browser } from 'protractor';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {

    const DishServiceStub = {
      getDishes: function(): Observable<Dish []> {
        return of(DISHES);
      }
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{ path: 'menu', component: MenuComponent}]),
        MatGridListModule,
        MatProgressSpinnerModule
      ],
      declarations: [ MenuComponent ],
      providers: [
        { provide: DishService, useValue: DishServiceStub },
        { provide: 'BaseURL', useValue: baseURL }
      ]
    })
    .compileComponents();

    const dishservice = TestBed.get(DishService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
