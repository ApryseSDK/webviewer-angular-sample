import { AppComponent } from "./app.component";
import { TestBed, waitForAsync } from "@angular/core/testing";

describe("AppComponent", () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
      }).compileComponents();
    })
  );

  it('should create the app', () => { // 4
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get CoreControls', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    spyOn(app.coreControlsEvent, 'emit');
    console.log(app.coreControlsEvent.emit);
    expect(app.coreControlsEvent.emit).toHaveBeenCalledWith('SINGLE');
  });
});
