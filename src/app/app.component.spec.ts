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

  it('should get CoreControls', (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance as AppComponent;
    fixture.detectChanges();
    spyOn(app.coreControlsEvent, 'emit');
    // wait for WV to finish loading document first before checking
    app.getDocumentLoadedObservable().subscribe(() => {
      expect(app.coreControlsEvent.emit).toHaveBeenCalledWith('Single');
      done();
    });
  });
});
