import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBoardComponent } from './table-board.component';

describe('TableTaskComponent', () => {
  let component: TableBoardComponent;
  let fixture: ComponentFixture<TableBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
